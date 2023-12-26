import catImage from '../assets/cat_404error.png';

function ErrorPage() {
  return (
    <div className="mt-[72px]">
      <h1 className="text-4xl text-center mt-[90px] mb-4">
        Oh no! This page does not exist!
      </h1>
      <img src={catImage} alt="cat" />
    </div>
  );
}

export default ErrorPage;
