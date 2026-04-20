import React from 'react';

const Contact = () => {
  return (
      <div className={"max-w-4xl mx-auto px-4 py-12"}>
        <div className="text-center mb-12">
          <h1 className={"text-4xl font-bold text-gray-900 mb-4"}>Contact Us</h1>
          <div className="text-xl text-gray-600">
            We&#39;d love to hear from you. Send us a message and we&#39;ll respond as
            soon as possible.
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-md border-gray-200 border p-8 ">
            <h2 className={"text-2xl font-semibold text-gray-900 mb-6"}>Send us a message</h2>
            <form className="space-y-6">
              <div className="">
                <label htmlFor="name" className={"block text-sm font-medium text-gray-700 mb-2"}>Full Name</label>
                <input
                    type="text"
                    id={"name"}
                    name={"name"}
                    placeholder={"Your Full Name"}
                    className={"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}/>

                <label htmlFor="name" className={"block text-sm font-medium text-gray-700 mb-2"}>Full Name</label>
                <input
                    type="text"
                    id={"name"}
                    name={"name"}
                    placeholder={"Your Full Name"}
                    className={"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}/>
              </div>

              <div className="">
                <label htmlFor="email" className={"block text-sm font-medium text-gray-700 mb-2"}>Full Name</label>
                <input
                    type="email"
                    id={"email"}
                    name={"email"}
                    placeholder={"Your Email"}
                    className={"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}/>
              </div>

              <div className="">
                <label htmlFor="subject" className={"block text-sm font-medium text-gray-700 mb-2"}>Subject</label>
                <input
                    type="text"
                    id={"subject"}
                    name={"subject"}
                    placeholder={"What is this about?"}
                    className={"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}/>
              </div>

              <div className="">
                <label htmlFor="message" className={"block text-sm font-medium text-gray-700 mb-2"}>Message</label>
                <textarea
                    id={"message"}
                    name={"name"}
                    rows={5}
                    placeholder={"Tell us more about your inquiry..."}
                    className={"w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}>
                </textarea>
              </div>

              <button type={"submit"} className={"w-full bg-blue-600 hover:bg-blue-700 text-white"}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Contact;