import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-[90vh] bg-blue-100">
      <motion.div
        className="w-12 h-12 rounded-full bg-blue-50"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
};

export default Loading;
