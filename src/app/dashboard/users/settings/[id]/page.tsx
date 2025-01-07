import React from "react";
import { getUserById } from "@/src/utils/action";
import SettingsUser from "@/src/app/components/SettingsUser";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const user = await getUserById(id);
  return (
    <div className="max-w-4xl flex items-center mx-auto my-16">
      <SettingsUser user={user} />
    </div>
  );
};

export default page;
