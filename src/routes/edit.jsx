import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom'


import { updateContact } from '../contacts'

export async function action({ request, params }) {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    await updateContact(params.contactId, updates)
    return redirect(`/contacts/${params.contactId}`)

}

const EditContact =()=> {

    const { contact } = useLoaderData()
    const navigate = useNavigate()

    return(
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input 
                    placeholder="First"
                    aria-label="First Name"
                    type="text"
                    name="first"
                    defaultValue={contact?.first}
                />
                <input 
                    placeholder="Last"
                    aria-label="Last Name"
                    type="text"
                    name="last"
                    defaultValue={contact?.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input 
                    type="text"
                    name="twitter"
                    placeholder="@twitter"
                    defaultValue={contact?.twitter}
                />
            </label>

            <label>
                <span>Avatar URL</span>
                <input 
                    aria-label='Avatar URL'
                    type="text"
                    name="avatar"
                    placeholder="https://example.com/avatar.jpg"
                    defaultValue={contact?.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={contact?.notes}
                    rows={6}
                />
            </label>
            <button type="submit">Save</button>
            <button 
                type="button"
                onClick={()=> {
                    navigate(-1)
                }}
                >Cancel</button>
        </Form>
    )
}

export default EditContact