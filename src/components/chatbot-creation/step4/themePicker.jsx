import HelpText from '@/components/ui/helpText';

function ThemePicker({label, helpText, value, onChange}) { 
    // Define available theme colors
    const themes = [
        { name: 'Teal', primary: '#0f81a7', secondary: '#deeeff' },
        { name: 'LightGreen', primary: '#1ea365', secondary: '#ecffde' },
        { name: 'DarkGreen', primary: '#016404', secondary: '#d7ffdb' },
        { name: 'Blue', primary: '#0f3fa7', secondary: '#d0e6ff' },
        { name: 'Purple', primary: '#6630ae', secondary: '#e5deff' },
        { name: 'Pink', primary: '#b3298c', secondary: '#ffdefe' },
        { name: 'Yellow', primary: '#ffe176', secondary: '#fff5c8' },
        { name: 'LightOrange', primary: '#ffa176', secondary: '#ffe6c8' },
        { name: 'LightPink', primary: '#ff8484', secondary: '#ffe3e3' },
        { name: 'OrangeBrown', primary: '#a26c0e', secondary: '#fff5de' },
        { name: 'Red', primary: '#a70f0f', secondary: '#ffdede' },
        { name: 'Black', primary: '#000000', secondary: '#f0f0f0' }
    ];

    const handleThemeSelect = (theme) => {
        if (onChange) {
            onChange(theme);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-end">
                {label && <label className="text-[16px] text-color-neutral mt-3">{label}</label>}
                {helpText && <HelpText text={helpText} />}
            </div>
            
            <div className="flex flex-row gap-6 mt-4">
                {/* Color Selection Grid */}
                <div className="flex flex-col">
                    <div className="grid grid-cols-6 gap-4">
                        {themes.map((theme, index) => (
                            <button
                                key={index}
                                onClick={() => handleThemeSelect(theme)}
                                className={`w-12 h-12 rounded-full border-4 transition-all duration-200 hover:scale-110 relative ${
                                    value?.primary === theme.primary 
                                        ? 'border-white shadow-xl ring-4 ring-gray-400 ring-opacity-50' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                style={{ backgroundColor: theme.primary }}
                                title={theme.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Two-Color Preview - Same height as circles grid */}
                <div className="flex-1 max-w-xs">
                    <div className="w-full h-[6rem] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        {/* Top half - Primary color */}
                        <div 
                            className="w-full h-12"
                            style={{ backgroundColor: value?.primary || '#000000' }}
                        />
                        
                        {/* Bottom half - Secondary color */}
                        <div 
                            className="w-full h-12"
                            style={{ backgroundColor: value?.secondary || '#333333' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemePicker;