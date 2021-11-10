import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function BackButton() {
  return (
    <>
      <Link href="/" scroll={false}>
        <a>
          <button
            type="button"
            className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
          >
            <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </a>
      </Link>
    </>
  );
}
