import catImage from '../assets/cat_404error.png';

function ErrorPage() {
  return (
    <div>
      <h1 className="text-4xl text-center mt-[80px] mb-4">
        Oh no! This page does not exist!
      </h1>
      <img src={catImage} alt="cat" />
    </div>
  );
}

export default ErrorPage;
