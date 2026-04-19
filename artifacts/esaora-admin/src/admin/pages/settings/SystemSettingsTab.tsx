import { useState, useEffect } from 'react';
import { useSiteSettings } from '@workspace/esaora-core/hooks/useData';
import { Save, Loader2, Check } from 'lucide-react';

export default function SystemSettingsTab() {
  const { settings, loading: loadingConfig, updateSetting } = useSiteSettings();
  const [siteName, setSiteName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loadingConfig) {
      setSiteName(settings.site_name || 'ESAORA Consortium');
      setContactEmail(settings.contact_email || 'contact@esaora.org');
      setMaintenanceMode(settings.maintenance_mode === 'true');
      setAllowRegistration(settings.allow_registration !== 'false');
    }
  }, [loadingConfig, settings]);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      await updateSetting('site_name', siteName);
      await updateSetting('contact_email', contactEmail);
      await updateSetting('maintenance_mode', maintenanceMode ? 'true' : 'false');
      await updateSetting('allow_registration', allowRegistration ? 'true' : 'false');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save system settings:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loadingConfig) {
    return <div className="flex justify-center p-10"><Loader2 className="w-5 h-5 animate-spin text-gray-300" /></div>;
  }

  return (
    <div className="bg-white rounded-[6px] border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="text-gray-900 font-bold">System Configuration</h3>
        <p className="text-xs text-gray-500 mt-0.5">Manage global variables and core functionality overrides for the platform.</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Platform Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-[6px] px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Global Contact Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-[6px] px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-500 transition-colors"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 space-y-4">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[6px] border border-gray-100">
            <div>
              <p className="text-sm font-bold text-gray-900">Maintenance Mode</p>
              <p className="text-xs text-gray-500 mt-0.5">When enabled, the public site redirects to a maintenance page.</p>
            </div>
            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative inline-flex items-center flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D2417] ${maintenanceMode ? 'bg-red-500' : 'bg-gray-200'}`}
              style={{ width: 44, height: 24 }}
            >
              <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition ease-in-out duration-200 ${maintenanceMode ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[6px] border border-gray-100">
            <div>
              <p className="text-sm font-bold text-gray-900">Allow Membership Registrations</p>
              <p className="text-xs text-gray-500 mt-0.5">Turn off to temporarily hide membership application forms.</p>
            </div>
            <button
              type="button"
              onClick={() => setAllowRegistration(!allowRegistration)}
              className={`relative inline-flex items-center flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D2417] ${allowRegistration ? 'bgemerald-500 bg-[#0D2417]' : 'bg-gray-200'}`}
              style={{ width: 44, height: 24 }}
            >
              <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition ease-in-out duration-200 ${allowRegistration ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-emerald-600 font-semibold flex items-center gap-2 h-6">
          {success && <><Check className="w-4 h-4" /> Changes saved</>}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0D2417] hover:bg-[#1a3f28] text-white rounded-[6px] text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Configuration
        </button>
      </div>
    </div>
  );
}
