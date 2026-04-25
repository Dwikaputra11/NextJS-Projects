"use client"
import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

import { Input } from "./ui/input";
import {Button} from "@/components/ui/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";

async function addUser(userData: FormData){
  const response = await fetch("/api/users",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

const AddUserForm = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]}).then(_ => {
        setName("")
        setEmail("")
      })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && name){
      mutation.mutate({name, email})
    }
  }

  return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add User (useMutation Example)</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
              <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Adding..." : " Add User"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
  );
};

export default AddUserForm;