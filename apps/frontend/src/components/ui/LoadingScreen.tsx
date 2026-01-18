import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-primary-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Loading HDIP
          </h2>
          <p className="text-sm text-text-tertiary mt-1">
            Initializing decision intelligence platform...
          </p>
        </div>
      </motion.div>
    </div>
  )
}
