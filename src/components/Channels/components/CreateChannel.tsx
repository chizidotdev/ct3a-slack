import Button from "@ui/Button";
import Modal, { Title } from "@ui/Modal";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { trpc } from "src/utils/trpc";

type CreateChannelProps = {
  teamId: string;
};

export default function CreateChannel({ teamId }: CreateChannelProps) {
  const { mutate } = trpc.channel.create.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ name });
    mutate(
      { name, teamId },
      {
        onSuccess() {
          setIsOpen(false);
          setName("");
        },
        onError(error) {
          console.log({ error });
        },
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-2 text-lg"
        >
          <IoAddOutline />
        </button>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Title>
          <div className="mb-3">Create Channel</div>
        </Title>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="# channel name"
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
