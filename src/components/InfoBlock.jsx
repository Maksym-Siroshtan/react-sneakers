function InfoBlock({ title, imageUrl, description }) {
  return (
    <div className="flex flex-col items-center w-70">
      <img src={imageUrl} alt="Info-image" className="w-36" />
      <h2 className="text-2xl font-bold mt-4">{title}</h2>
      <p className="text-xl text-slate-400 text-center mt-2 mb-8">
        {description}
      </p>

      <button className="relative bg-lime-300 text-white w-full px-14 rounded-2xl text-lg py-4 hover:bg-lime-500 disabled:bg-slate-200">
        Повернутися на головну
        <img
          src="/arrow-next.svg"
          alt="Arrow-right"
          className="absolute left-6 top-6 rotate-180"
        />
      </button>
    </div>
  );
}

export default InfoBlock;
