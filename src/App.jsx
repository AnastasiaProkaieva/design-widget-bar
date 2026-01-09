import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background - Simulated Salesforce-style Website */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        {/* Header */}
        <header className="h-16 bg-white/90 backdrop-blur-sm border-b border-gray-200/80 flex items-center px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0176D3] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="font-semibold text-gray-800">Salesforce</span>
          </div>
          <nav className="flex-1 flex justify-center gap-10">
            {['Products', 'Industries', 'Customers', 'Learning', 'Support'].map((item) => (
              <span key={item} className="text-sm text-gray-600 hover:text-[#0176D3] cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 cursor-pointer hover:text-[#0176D3]">Login</span>
            <button className="px-4 py-2 bg-[#0176D3] text-white text-sm font-medium rounded-lg hover:bg-[#0B5CAB] transition-colors">
              Try for free
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-6xl mx-auto px-8 pt-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-[#0176D3] font-medium mb-6">
              <span className="w-2 h-2 bg-[#0176D3] rounded-full animate-pulse"></span>
              Introducing Agentforce
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The #1 AI CRM, now with<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0176D3] to-purple-600">
                Agentforce
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Build and customize autonomous AI agents to support your employees and customers 24/7.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3.5 bg-[#0176D3] text-white font-semibold rounded-lg hover:bg-[#0B5CAB] transition-all hover:shadow-lg hover:shadow-blue-500/25">
                Watch demos
              </button>
              <button className="px-8 py-3.5 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 hover:border-gray-400 transition-all hover:shadow-lg">
                Try for free
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-6 mb-16">
            {[
              { value: '150K+', label: 'Customers worldwide' },
              { value: '#1', label: 'CRM for 11 years' },
              { value: '25%', label: 'Revenue increase' },
              { value: '99.9%', label: 'Uptime guarantee' }
            ].map((stat) => (
              <div key={stat.label} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 text-center">
                <div className="text-3xl font-bold text-[#0176D3] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-6 pb-32">
            {[
              {
                icon: '💼',
                title: 'Sales Cloud',
                desc: 'Close more deals with AI-powered selling tools and automation.'
              },
              {
                icon: '🎯',
                title: 'Service Cloud',
                desc: 'Deliver exceptional customer service across every channel.'
              },
              {
                icon: '📊',
                title: 'Marketing Cloud',
                desc: 'Create personalized customer journeys at scale.'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg hover:shadow-gray-200/50 transition-all cursor-pointer group">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0176D3] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                <div className="mt-4 text-sm font-medium text-[#0176D3] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Chat Widget - Floats above everything */}
      <ChatWidget />
    </div>
  );
}

export default App;
