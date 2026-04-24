"use server"
import dbConnect from "@/lib/db.js";
import {Contact} from "@/models/Contact";
import {revalidatePath, revalidateTag, unstable_cache} from "next/cache";

export async function creatContact(formData) {
  try {
    await dbConnect()
    const name = formData.get('name');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const email = formData.get('email');

    if (!name || !subject || !message || !email) {
      return {
        success: false,
        error: "All field is required",
      }
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    })

    return {
      success: true,
      message: 'Contact successfully created',
      contactId: contact._id.toString(),
    }
  } catch (e) {
    console.log("Error creating contacts: ", e);
    return {
      success: false,
      message: 'Something went wrong',
    }
  }
}

export async function updateContact(contactId, status) {
  try {
    await dbConnect();
    await Contact.findByIdAndUpdate(contactId, {status});

    // revalidate without refresh the page
    // revalidatePath("/contacts");
    revalidateTag("contact-stats","max")

    return {success: true, message: 'Contact successfully updated'};
  } catch (e) {
    console.log("Error updating contact: ", e);
    return {success: false, message: 'Something went wrong'};
  }
}


export async function getContacts() {

  try {
    await dbConnect();

    const contacts = await Contact.find({}).sort({createdAt: -1}).lean();

    return contacts.map((contact) => ({
      ...contact,
      _id: contact._id,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    }))
  } catch (e) {
    console.log("Error getting contacts: ", e);
    return []
  }
}


export async function getContactStats(){
  const getCacheStats = unstable_cache(
      async () => {
        await dbConnect();
        const total = await Contact.countDocuments()
        const newCount = await Contact.countDocuments({status: "new"})
        const repliedCount = await Contact.countDocuments({status: "replied"})
        const readCount = await Contact.countDocuments({status: "read"})

        return {total, newCount, readCount, repliedCount}
      },
      ["contact-stats"],
      {tags:["contact-stats"]}
  );

  return getCacheStats();
}