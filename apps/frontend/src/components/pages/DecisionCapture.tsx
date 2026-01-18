import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { CREATE_DECISION, GET_DECISIONS } from '../../graphql/queries';

export default function DecisionCapture() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'CAREER',
    description: '',
    context: {
      age: 30,
      location: '',
      economicCondition: 'stable'
    },
    confidence: 50,
    riskLevel: 50,
    alternatives: ['']
  });

  const [createDecision, { loading, error: mutationError }] = useMutation(CREATE_DECISION, {
    refetchQueries: [{ query: GET_DECISIONS }],
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.title.trim()) {
      setError('Please enter a decision title');
      return;
    }

    try {
      await createDecision({
        variables: {
          input: {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            context: formData.context,
            confidence: formData.confidence,
            riskLevel: formData.riskLevel,
            alternatives: formData.alternatives.filter(alt => alt.trim())
          }
        }
      });

      setSuccess(true);
      // Reset form
      setFormData({
        title: '',
        category: 'CAREER',
        description: '',
        context: { age: 30, location: '', economicCondition: 'stable' },
        confidence: 50,
        riskLevel: 50,
        alternatives: ['']
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to create decision');
    }
  };

  const addAlternative = () => {
    setFormData({ ...formData, alternatives: [...formData.alternatives, ''] });
  };

  const updateAlternative = (index: number, value: string) => {
    const newAlternatives = [...formData.alternatives];
    newAlternatives[index] = value;
    setFormData({ ...formData, alternatives: newAlternatives });
  };

  const removeAlternative = (index: number) => {
    setFormData({
      ...formData,
      alternatives: formData.alternatives.filter((_, i) => i !== index)
    });
  };

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

      {/* Success/Error Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-success p-4 rounded-lg flex items-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-success-500" />
          <span className="text-success-700">Decision captured successfully!</span>
        </motion.div>
      )}

      {(error || mutationError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-danger p-4 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-danger-500" />
          <span className="text-danger-700">{error || mutationError?.message}</span>
        </motion.div>
      )}

      <div className="glass p-8 rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['CAREER', 'FINANCIAL', 'PERSONAL', 'HEALTH'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.category === cat
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface text-text-secondary hover:bg-surface-hover'
                  }`}
                  onClick={() => setFormData({ ...formData, category: cat })}
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
              rows={4}
              placeholder="Describe the decision context, motivations, and considerations..."
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Context Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Age
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                value={formData.context.age}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    context: { ...formData.context, age: parseInt(e.target.value) || 0 }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="City, Country"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                value={formData.context.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    context: { ...formData.context, location: e.target.value }
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Economic Status
              </label>
              <select
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                value={formData.context.economicCondition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    context: { ...formData.context, economicCondition: e.target.value }
                  })
                }
              >
                <option value="growing">Growing</option>
                <option value="stable">Stable</option>
                <option value="volatile">Volatile</option>
                <option value="declining">Declining</option>
              </select>
            </div>
          </div>

          {/* Confidence Slider */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confidence Level: {formData.confidence}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
              value={formData.confidence}
              onChange={(e) =>
                setFormData({ ...formData, confidence: parseInt(e.target.value) })
              }
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Risk Slider */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Risk Level: {formData.riskLevel}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
              value={formData.riskLevel}
              onChange={(e) =>
                setFormData({ ...formData, riskLevel: parseInt(e.target.value) })
              }
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>

          {/* Alternatives */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Alternatives Considered
            </label>
            <div className="space-y-2">
              {formData.alternatives.map((alt, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Alternative ${index + 1}`}
                    className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    value={alt}
                    onChange={(e) => updateAlternative(index, e.target.value)}
                  />
                  {formData.alternatives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAlternative(index)}
                      className="px-3 py-2 bg-danger-500/10 text-danger-500 rounded-lg hover:bg-danger-500/20"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addAlternative}
              className="mt-2 px-4 py-2 bg-surface text-text-secondary rounded-lg hover:bg-surface-hover"
            >
              + Add Alternative
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-cyan text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Decision'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="px-6 py-3 bg-accent-purple/10 text-accent-purple rounded-lg font-medium flex items-center gap-2 hover:bg-accent-purple/20"
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
