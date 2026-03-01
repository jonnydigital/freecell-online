'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Volume2, Sparkles, Wand2, Monitor, HandPointer, MousePointer2 } from 'lucide-react';
import { GameSettings } from '../lib/storage';
import ThemeSelector from './ThemeSelector';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    settings: GameSettings;
    onUpdateSettings: (settings: GameSettings) => void;
}

export default function SettingsPanel({ isOpen, onClose, settings, onUpdateSettings }: SettingsPanelProps) {
    const toggleSetting = (key: keyof GameSettings) => {
        onUpdateSettings({
            ...settings,
            [key]: !settings[key]
        });
    };

    const setAnimationSpeed = (speed: GameSettings['animationSpeed']) => {
        onUpdateSettings({ ...settings, animationSpeed: speed });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, x: '50%' }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{ scale: 0.9, opacity: 0, x: '50%' }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a351a] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Settings className="text-[#D4AF37]" size={24} />
                                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    Game Settings
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-white/20 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                            {/* Gameplay Section */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wand2 size={16} className="text-[#D4AF37]/60" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Gameplay</h3>
                                </div>

                                <div className="space-y-3">
                                    <SettingToggle
                                        label="Auto-Hint"
                                        description="Highlight moves automatically"
                                        enabled={settings.autoHint}
                                        onToggle={() => toggleSetting('autoHint')}
                                    />
                                    <SettingToggle
                                        label="Auto-Finish"
                                        description="Move cards to foundations when game is solved"
                                        enabled={settings.autoFinish}
                                        onToggle={() => toggleSetting('autoFinish')}
                                    />
                                    <SettingToggle
                                        label="One-Tap Moves"
                                        description="Automatically move cards on click"
                                        enabled={settings.autoMove}
                                        onToggle={() => toggleSetting('autoMove')}
                                    />
                                </div>
                            </section>

                            {/* Visuals Section */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={16} className="text-[#D4AF37]/60" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Visuals & Animation</h3>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-xs text-white/50 font-medium">Animation Speed</label>
                                    <div className="grid grid-cols-3 gap-2 p-1 bg-black/20 rounded-lg">
                                        {(['slow', 'normal', 'fast'] as const).map((speed) => (
                                            <button
                                                key={speed}
                                                onClick={() => setAnimationSpeed(speed)}
                                                className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${settings.animationSpeed === speed
                                                    ? 'bg-[#1a5c1a] text-white shadow-lg'
                                                    : 'text-white/30 hover:text-white/60'
                                                    }`}
                                            >
                                                {speed}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Appearance (ThemeSelector) */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Monitor size={16} className="text-[#D4AF37]/60" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Appearance</h3>
                                </div>
                                <ThemeSelector />
                            </section>

                            {/* Audio Section */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Volume2 size={16} className="text-[#D4AF37]/60" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Audio</h3>
                                </div>

                                <SettingToggle
                                    label="Sound Effects"
                                    description="Clicks, card glides, and wins"
                                    enabled={settings.soundEnabled}
                                    onToggle={() => toggleSetting('soundEnabled')}
                                />
                            </section>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-black/20 border-t border-white/5 text-[10px] text-white/20 uppercase tracking-widest text-center">
                            FreeCell Online v1.2.0 • Premium Edition
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function SettingToggle({ label, description, enabled, onToggle }: {
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void
}) {
    return (
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
        >
            <div>
                <div className="text-sm font-semibold text-white/90">{label}</div>
                <div className="text-[10px] text-white/40">{description}</div>
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${enabled ? 'bg-[#D4AF37]' : 'bg-white/10'}`}>
                <motion.div
                    animate={{ x: enabled ? 22 : 2 }}
                    initial={false}
                    className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-md"
                />
            </div>
        </button>
    );
}
