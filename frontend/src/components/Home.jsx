import db from "../assets/db.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-tr from-[#203139] to-[#438FB2] px-4 md:px-8">
      <div className="mt-8 md:mt-12 mb-6">
        <h1 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl text-center">
          Gestion BD
        </h1>
      </div>
      <div className="w-full max-w-4xl mb-8 md:mb-12">
        <p className="text-white text-sm md:text-base lg:text-lg text-center leading-relaxed md:leading-loose">
          C&apos;est une application qui permet aux utilisateurs de gérer une base de données relationnelle de manière intuitive et sécurisée. Elle offre une interface utilisateur conviviale pour interagir avec les données sans nécessiter de connaissances avancées en SQL. <br /> Une application de gestion de base de données est un logiciel permettant de stocker, organiser, manipuler et sécuriser des données de manière structurée. Elle permet d&apos;effectuer des opérations.
        </p>
      </div>

      <div className="w-full max-w-3xl mb-8 md:mb-12">
        <img
          src={db}
          alt="Database illustration"
          className="w-full h-55 object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default Home;