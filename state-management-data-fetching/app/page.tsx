import Image from "next/image";
import UserLists from "@/components/user-lists.";
import AddUserForm from "@/components/add-user-form";

export default function Home() {
  return (
      <div className={"container mx-auto p-6 max-w-4xl"}>
        <h1 className={"text-3xl font-bold mb-8 text-center"}>Tanstack Query Demo</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <UserLists />
            <AddUserForm />
          </div>
        </div>
      </div>
  );
}
