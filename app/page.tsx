import Image from "next/image";
import LoginForm, { Session } from "./components/LoginForm";
import { useState } from "react";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  return (
    <>
      <LoginForm onLogin={(data) => setSession(data)} />;
    </>
  );
}
