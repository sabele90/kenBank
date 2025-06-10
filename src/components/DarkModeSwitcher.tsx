import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect } from "react";

const DarkModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // Sincronizar con Tailwind cuando cambie el modo de Chakra
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  // Cargar preferencia inicial
  useEffect(() => {
    const saved = localStorage.getItem("chakra-ui-color-mode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (!saved && prefersDark) {
      toggleColorMode();
    }
  }, []);

  return (
    <Flex
      align="center"
      justify="center"
      position="relative"
      w="48px"
      h="26px"
      bg={isDark ? "gray.700" : "gray.300"}
      borderRadius="full"
      px="1"
      cursor="pointer"
      onClick={toggleColorMode}
    >
      {/* Icono Sol */}
      <Box flex="1" display="flex" justifyContent="flex-start" alignItems="center">
        <FaSun color={isDark ? "#facc15" : "#e2e8f0"} size={12} />
      </Box>

      {/* Icono Luna */}
      <Box flex="1" display="flex" justifyContent="flex-end" alignItems="center">
        <FaMoon color={!isDark ? "#1e293b" : "#64748b"} size={12} />
      </Box>

      {/* Thumb */}
      <Box
        position="absolute"
        top="2px"
        left={isDark ? "24px" : "2px"}
        boxSize="22px"
        bg="white"
        borderRadius="full"
        transition="all 0.3s ease"
        boxShadow="md"
      />
    </Flex>
  );
};

export default DarkModeSwitcher;