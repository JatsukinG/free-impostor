import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { Button } from '@/components/forms'

const ToggleDarkModeButton = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newIsDark = !isDark;

    if (newIsDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setIsDark(newIsDark);
  };

  return (
    <Button
      outlined
      icon={isDark ? FaMoon : FaSun}
      onClick={toggleDarkMode}
    />
  );
};

export default ToggleDarkModeButton;