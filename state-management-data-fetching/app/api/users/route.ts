import {NextRequest} from "next/server";

let users = [
  {id: 1, name: 'John Doe', email: 'john@example.com'},
  {id: 2, name: 'John Smith', email: 'smith@example.com'},
  {id: 3, name: 'Bob Marley', email: 'bob@example.com'},
]

export async function GET() {
  await new Promise(((resolve) => setTimeout(resolve, 1000)));
  return Response.json(users)
}

export async function POST(request: NextRequest) : Promise<Response> {
  const body = await request.json();

  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email
  }

  users.push(newUser);

  await new Promise(((resolve) => setTimeout(resolve, 1000)));

  return Response.json(users);
}