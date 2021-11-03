import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  const goBack = (event) => {
    event.preventDefault();

    router.back();
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
        onClick={goBack}
      >
        <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </>
  );
}
