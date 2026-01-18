import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Sparkles } from "lucide-react";

export default function DecisionCapture() {
  const [formData, setFormData] = useState({
    title: "",
    category: "career",
    description: "",
    context: {
      age: "",
      region: "",
      economicStatus: "",
    },
    confidence: 50,
    risk: 50,
    alternatives: [""],
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-text-primary">
          Decision Capture Engine
        </h1>
        <p className="text-text-tertiary mt-1">
          Log a new decision with full context and alternatives
        </p>
      </div>

      <div className="glass p-8 rounded-xl">
        <form className="space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Decision Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Switch from Engineering to Product Management"
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Career", "Business", "Policy", "Personal"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.category === cat.toLowerCase()
                      ? "bg-primary-500 text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, category: cat.toLowerCase() })
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Detailed Description
            </label>
            <textarea
              rows={5}
              placeholder="Describe the decision, the current situation, and what you're trying to achieve..."
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Context Tags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Age Range
              </label>
              <select className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                <option>18-24</option>
                <option>25-34</option>
                <option>35-44</option>
                <option>45-54</option>
                <option>55+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Region
              </label>
              <input
                type="text"
                placeholder="e.g., North America"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Economic Context
              </label>
              <select className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                <option>Growth</option>
                <option>Stable</option>
                <option>Recession</option>
              </select>
            </div>
          </div>

          {/* Confidence & Risk Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Confidence Level:{" "}
                <span className="text-primary-400">{formData.confidence}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.confidence}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confidence: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Risk Assessment:{" "}
                <span className="text-accent-amber">{formData.risk}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.risk}
                onChange={(e) =>
                  setFormData({ ...formData, risk: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent-amber"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              Save Decision
            </motion.button>
            <motion.button
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-surface hover:bg-surface-hover text-text-primary rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5" />
              AI Assist
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
