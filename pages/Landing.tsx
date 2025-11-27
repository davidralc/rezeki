import React from 'react';
import { ArrowRight, CheckCircle, Shield, Zap, Globe } from 'lucide-react';
import Button from '../components/Button';

interface LandingProps {
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-800 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
               <Zap className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-white">Rezeki.online</span>
          </div>
          <div className="flex gap-4">
            <button onClick={onLogin} className="text-slate-300 hover:text-white font-medium">Masuk</button>
            <Button onClick={onLogin} size="sm">Daftar</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center py-20 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Ubah Waktu Luang Anda Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Uang Tunai</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg">
              Dapatkan imbalan dengan menyelesaikan tugas sederhana, survei, dan bermain game. Pembayaran via PayPal, Kripto, dan Kartu Hadiah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onLogin} size="lg" className="gap-2">
                Mulai Hasilkan Sekarang <ArrowRight size={20} />
              </Button>
              <div className="flex items-center gap-2 text-slate-400 px-4 py-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="w-8 h-8 rounded-full border-2 border-dark" src={`https://picsum.photos/32/32?random=${i}`} alt="user" />
                  ))}
                </div>
                <span className="text-sm">10k+ Pengguna</span>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-600 rounded-2xl blur opacity-30"></div>
             <div className="relative bg-card border border-slate-800 rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <span className="text-xs text-slate-500">Dasbor Rezeki.online</span>
               </div>
               <div className="space-y-4">
                 <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                       <div className="bg-blue-900/50 p-2 rounded text-blue-400"><Globe size={20}/></div>
                       <div>
                         <div className="h-2 w-24 bg-slate-600 rounded mb-1"></div>
                         <div className="h-2 w-16 bg-slate-700 rounded"></div>
                       </div>
                    </div>
                    <div className="h-6 w-16 bg-emerald-500/20 rounded-full"></div>
                 </div>
                 <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                       <div className="bg-purple-900/50 p-2 rounded text-purple-400"><Zap size={20}/></div>
                       <div>
                         <div className="h-2 w-32 bg-slate-600 rounded mb-1"></div>
                         <div className="h-2 w-20 bg-slate-700 rounded"></div>
                       </div>
                    </div>
                    <div className="h-6 w-16 bg-emerald-500/20 rounded-full"></div>
                 </div>
                  <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                       <div className="bg-orange-900/50 p-2 rounded text-orange-400"><Shield size={20}/></div>
                       <div>
                         <div className="h-2 w-20 bg-slate-600 rounded mb-1"></div>
                         <div className="h-2 w-12 bg-slate-700 rounded"></div>
                       </div>
                    </div>
                    <div className="h-6 w-16 bg-emerald-500/20 rounded-full"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Cara Kerja</h2>
            <p className="text-slate-400">Tiga langkah sederhana untuk mulai mendapatkan pembayaran pertama Anda hari ini.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Daftar', desc: 'Buat akun gratis Anda dalam kurang dari 30 detik.', icon: CheckCircle },
              { title: 'Selesaikan Tugas', desc: 'Pilih dari ratusan penawaran, survei, dan game.', icon: Zap },
              { title: 'Dapatkan Bayaran', desc: 'Tarik tunai secara instan melalui PayPal, Kripto, atau Kartu Hadiah.', icon: Shield },
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-slate-800 hover:border-primary/50 transition-colors">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="bg-dark border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Rezeki.online. Hak cipta dilindungi undang-undang.</p>
      </footer>
    </div>
  );
};

export default Landing;