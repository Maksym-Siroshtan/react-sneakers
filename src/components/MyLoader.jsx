import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={145}
    height={230}
    viewBox="0 0 145 230"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="145" height="120" />
    <rect x="0" y="140" rx="5" ry="5" width="145" height="15" />
    <rect x="0" y="160" rx="5" ry="5" width="100" height="15" />
    <rect x="0" y="190" rx="10" ry="10" width="70" height="34" />
    <rect x="110" y="190" rx="10" ry="10" width="34" height="34" />
  </ContentLoader>
);

export default MyLoader;
