export default function Heading(props) {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:pt-12 sm: pb-20 sm:px-6 lg:px-8 lg:flex lg:justify-between 2xl:pt-16 2xl:pb-22">
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
