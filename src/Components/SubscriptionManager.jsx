import { useState } from 'react';

export default function SubscriptionManager() {
  // 1. HAFIZA (State) TANIMLAMALARI
  // Aboneliklerimizi tutacağımız liste.
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Netflix' }
  ]);
  // Input kutusuna yazılan metni takip edeceğimiz yer.
  const [inputValue, setInputValue] = useState('');
  // Hangi öğeyi düzenlediğimizi bilmek için ID tutacağımız yer.
  const [editId, setEditId] = useState(null);

  // 2. AKSİYONLAR (Fonksiyonlar)
  
  // Kaydetme (Yeni Ekleme veya Güncelleme) İşlemi
  const handleSave = () => {
    if (inputValue.trim() === '') return; // Kutucuk boşsa hiçbir şey yapma

    if (editId) {
      // EĞER DÜZENLEME MODUNDAYSAK:
      setSubscriptions(subscriptions.map(sub => 
        sub.id === editId ? { ...sub, name: inputValue } : sub
      ));
      setEditId(null); // Düzenleme modundan çık
    } else {
      // EĞER YENİ EKLEME MODUNDAYSAK:
      const newSub = {
        id: Date.now(), // Benzersiz bir kimlik (ID) oluşturur
        name: inputValue
      };
      setSubscriptions([...subscriptions, newSub]);
    }
    setInputValue(''); // İşlem bitince kutucuğu temizle
  };

  // Silme İşlemi
  const handleDelete = (id) => {
    // Tıklanan ID dışındaki tüm abonelikleri filtrele ve listeyi güncelle
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  // Düzenleme Moduna Geçiş
  const handleEdit = (sub) => {
    setInputValue(sub.name); // Tıklanan öğenin adını input'a yazdır
    setEditId(sub.id);       // Sisteme hangi ID'yi düzenlediğimizi bildir
  };

  // 3. GÖRÜNÜM (Arayüz)
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Abonelik Takipçisi</h2>
      
      {/* Ekleme/Güncelleme Formu */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Abonelik (örn: Spotify)"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <button 
          onClick={handleSave}
          className={`${editId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-5 py-2 rounded-lg font-medium transition-colors`}
        >
          {editId ? 'Güncelle' : 'Ekle'}
        </button>
      </div>

      {/* Abonelik Listesi */}
      <ul className="space-y-3">
        {subscriptions.map((sub) => (
          <li key={sub.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
            <span className="font-medium text-gray-700">{sub.name}</span>
            <div className="space-x-3">
              <button onClick={() => handleEdit(sub)} className="text-sm font-semibold text-yellow-600 hover:text-yellow-700">Düzenle</button>
              <button onClick={() => handleDelete(sub.id)} className="text-sm font-semibold text-red-600 hover:text-red-700">Sil</button>
            </div>
          </li>
        ))}
        
        {/* Liste boşsa görünecek mesaj */}
        {subscriptions.length === 0 && (
          <p className="text-center text-gray-500 text-sm">Henüz bir abonelik eklenmedi.</p>
        )}
      </ul>
    </div>
  )
}