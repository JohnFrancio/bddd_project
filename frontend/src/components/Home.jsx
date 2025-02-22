import db from "../assets/db.png";

const Home = () => {


  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-tr from-blue-900 to-cyan-700">
      <div className="mt-12">
        <h1 className="font-bold text-white text-4xl">Gestion BD</h1>
      </div>
      <div className="flex flex-col items-center w-150 mt-5">
        <h4>
          <p className="font-bold text-center text-white">
            C&apos;est un application qui permet aux utilisateur de gerer une base ded onnées relationnelle de manière intuitive et sécuriséé. Elle offre une interface utilisateur conviviale pour interagir avec les données sans nécessiter de connaissances avancées en SQL.


            Une application de gestion de base de données est un logiciel permettant de stocker, organiser, manipuler et sécuriser des données de manière structuréé. Elle permet d&apos;effectuer des opérations.
          </p>
        </h4>
      </div>
      <div className="flex flex-col items-center">
        <img src={db} alt="pic" className="h-85" />
      </div>
    </div>
  );
};

export default Home;
