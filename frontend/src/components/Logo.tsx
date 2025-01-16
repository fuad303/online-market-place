const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 60"
    fill="none"
    className="w-16"
  >
    <path
      d="M30 10 Q10 10, 10 20 Q10 30, 20 30 Q30 30, 30 40 Q30 50, 10 50"
      stroke="#e50914"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
    />
    <text
      x="35"
      y="38"
      fontSize="36"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fill="#ff9900"
    >
      napy
    </text>
    <path
      d="M10 42 C30 55, 70 55, 90 42"
      stroke="#ff9900"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export default Logo;
