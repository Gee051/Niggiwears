import { getServerSession } from "next-auth";
import Signup from "../components/RegisterForm";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return <Signup />;
}

