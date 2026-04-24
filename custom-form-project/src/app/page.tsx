import Image from "next/image";
import dbConnect from "@/lib/db.js";
import ContactForm from "@/components/contact-form";

export default async function Home() {

  return (
    <div className={"min-h-screen px-12 py-4"}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Server Actions Demo</h1>
          <p className={"text-xl text-gray-600 max-2xl mx-auto"}>Contact form with mongodb and revalidations</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
