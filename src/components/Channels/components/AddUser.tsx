import Button from "@ui/Button";
import Modal, { Title } from "@ui/Modal";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { trpc } from "src/utils/trpc";

type AddUserProps = {
  teamId: string;
};

export default function AddUser({ teamId }: AddUserProps) {
  const { mutateAsync, status } = trpc.team.addUser.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await mutateAsync(
      { email, teamId },
      {
        onSuccess(data) {
          console.log({ data });

          setIsOpen(false);
          setEmail("");
        },
        onError(error) {
          console.error("my code", { error: error.message });
        },
      }
    );

    console.log({ status });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 text-sm"
      >
        <IoAddOutline /> Add User
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Title>
          <div className="mb-3">Add User</div>
        </Title>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="name"
                placeholder="Enter email of the user..."
                autoComplete="off"
                className="w-full rounded-md border-gray-300 focus:border-secondary focus:ring-secondary sm:text-sm"
              />
            </div>
          </label>

          <div className="flex gap-2 self-end">
            <Button intent="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
