"use client";
import React from "react";
import { motion } from "motion/react";
import { Users, Cpu, TrendingUp, GitMerge, Shield, Zap } from "lucide-react";

interface LeadershipProps {
  leadership: string[];
}

export const Leadership: React.FC<LeadershipProps> = ({ leadership }) => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-6 h-6 text-indigo-600" />;
      case 1:
        return <Cpu className="w-6 h-6 text-emerald-600" />;
      case 2:
        return <TrendingUp className="w-6 h-6 text-amber-600" />;
      case 3:
        return <GitMerge className="w-6 h-6 text-rose-600" />;
      default:
        return <Shield className="w-6 h-6 text-indigo-600" />;
    }
  };

  const getGradient = (index: number) => {
    switch (index) {
      case 0:
        return "from-indigo-50 to-blue-50/50 border-indigo-100/50";
      case 1:
        return "from-emerald-50 to-teal-50/50 border-emerald-100/50";
      case 2:
        return "from-amber-50 to-orange-50/50 border-amber-100/50";
      case 3:
        return "from-rose-50 to-pink-50/50 border-rose-100/50";
      default:
        return "from-slate-50 to-slate-50/50 border-slate-100/50";
    }
  };

  return (
    <section
      id="leadership"
      className="max-w-7xl mx-auto px-6 mb-[68px] md:mb-[84px] scroll-mt-32 md:scroll-mt-40"
    >
      <div className="bg-white rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden relative border border-slate-200 shadow-xl">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-100/50 blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                Leadership
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 text-slate-900 leading-[1.1]">
                ENGINEERING <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                  GOVERNANCE.
                </span>
              </h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Driving excellence through mentorship, architectural oversight,
                and strategic technical planning to build high-performing
                engineering cultures.
              </p>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {leadership?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 md:p-8 rounded-[2rem] bg-gradient-to-br ${getGradient(i)} border hover:shadow-md hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                  {getIcon(i)}
                </div>
                <p className="text-slate-700 font-semibold leading-relaxed text-lg">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
