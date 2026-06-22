import { useToastStore } from '../../stores/toastStore';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-surface';
        let borderColor = 'border-border';
        let iconColor = 'text-brand-500';
        let icon = 'info';

        if (toast.type === 'success') {
          bgColor = 'bg-green-500/10 dark:bg-green-500/20';
          borderColor = 'border-green-500/25 dark:border-green-500/30';
          iconColor = 'text-green-600 dark:text-green-400';
          icon = 'check_circle';
        } else if (toast.type === 'error') {
          bgColor = 'bg-red-500/10 dark:bg-red-500/20';
          borderColor = 'border-red-500/25 dark:border-red-500/30';
          iconColor = 'text-red-600 dark:text-red-400';
          icon = 'error';
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-500/10 dark:bg-amber-500/20';
          borderColor = 'border-amber-500/25 dark:border-amber-500/30';
          iconColor = 'text-amber-600 dark:text-amber-400';
          icon = 'warning';
        }

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-2xl border ${bgColor} ${borderColor} shadow-xl backdrop-blur-md pointer-events-auto animate-slide-in text-text-main`}
          >
            <span className={`material-icons ${iconColor} text-2xl`}>{icon}</span>
            <div className="flex-1 text-sm font-bold leading-tight">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text-main transition-colors p-1 flex items-center justify-center rounded-lg"
            >
              <span className="material-icons text-base">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
