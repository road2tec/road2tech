"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import LoginModal from "./Login";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start px-6 py-4">
        <a className="btn btn-ghost text-xl">Road2Tech</a>
      </div>
      <div className="navbar-end space-x-2">
        <button
          className="btn btn-secondary rounded-full"
          onClick={() => {
            const loginModal = document.getElementById(
              "login_modal"
            ) as HTMLDialogElement;
            if (loginModal) {
              loginModal.showModal();
            }
          }}
        >
          Login
        </button>
        <a
          className="btn bg-black text-white text-sm rounded-full hover:bg-gray-800 transition font-semibold"
          href="#register"
        >
          APPLY FOR FREE <IconArrowNarrowRight size={16} />
        </a>
      </div>
      <LoginModal />
    </div>
  );
}
