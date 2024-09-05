export const LeapWallet = {
  autoConnect: async () => {
    if (typeof window.leap !== 'undefined') {
      try {
        await window.leap.enable('cosmoshub-4');
        const offlineSigner = window.leap.getOfflineSigner('cosmoshub-4');
        const accounts = await offlineSigner.getAccounts();
        return accounts[0].address;
      } catch (error) {
        console.error('Error connecting to Leap wallet:', error);
        return null;
      }
    }
    return null;
  },
};

export const KeplrWallet = {
  connect: async () => {
    if (typeof window.keplr !== 'undefined') {
      try {
        await window.keplr.enable('cosmoshub-4');
        const offlineSigner = window.keplr.getOfflineSigner('cosmoshub-4');
        const accounts = await offlineSigner.getAccounts();
        return accounts[0].address;
      } catch (error) {
        console.error('Error connecting to Keplr wallet:', error);
        return null;
      }
    }
    return null;
  },
};