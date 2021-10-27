export default function Heading(props) {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {props.heading}
          </h2>
          <p className="mt-5 text-xl text-gray-500">{props.subheading}</p>
        </div>
      </div>
    </div>
  );
}
