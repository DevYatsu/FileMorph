import {
  Alert as ChakraAlert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/alert";

export default function ErrorAlert({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <ChakraAlert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="135px"
      className="w-full max-w-2xl px-2 py-3 bg-red-500 border rounded-sm border-slate-700 dark:border-white text-slate-800"
    >
      <AlertIcon boxSize="20px" mt={10} className="text-slate-50" />
      <AlertTitle
        mt={4}
        mb={1}
        mx={10}
        fontSize="lg"
        className="text-lg font-extrabold xl:text-xl "
      >
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm" className="text-slate-100 ">
        {desc}
      </AlertDescription>
    </ChakraAlert>
  );
}
