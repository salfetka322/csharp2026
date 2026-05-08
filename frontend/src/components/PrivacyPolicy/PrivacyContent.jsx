const PrivacyContent = ({ title, content }) => {
  return (
    <div>
      <h2 className='mb-6 text-3xl font-bold text-white'>{title}</h2>
      {Array.isArray(content) ? (
        <ul className='pl-6 mb-8 list-disc text-white/80'>
          {content.map((item, index) => (
            <li key={index} className='text-lg text-white/80'>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className='mb-8 text-lg text-white/80'>{content}</p>
      )}
    </div>
  );
};

export default PrivacyContent;
