// Daftar kata dalam bahasa Indonesia
const indonesianWords = [
  'dan', 'di', 'yang', 'tidak', 'dengan', 'ini', 'dari', 'untuk', 'pada', 'adalah',
  'saya', 'akan', 'dia', 'kita', 'itu', 'ke', 'atau', 'sebagai', 'dapat', 'orang',
  'mereka', 'telah', 'ada', 'satu', 'kami', 'saat', 'jika', 'lebih', 'sudah', 'karena',
  'bagi', 'oleh', 'hal', 'juga', 'semua', 'ketika', 'dua', 'masih', 'sekali', 'setelah',
  'kepada', 'belum', 'melakukan', 'kembali', 'maka', 'tersebut', 'bisa', 'seperti', 'saja', 'melalui',
  'tahun', 'seseorang', 'lain', 'perlu', 'banyak', 'menjadi', 'sekarang', 'tempat', 'baik', 'dalam',
  'bahwa', 'hanya', 'kamu', 'mau', 'sangat', 'mungkin', 'tentang', 'bukan', 'namun', 'masing',
  'selama', 'harus', 'tanpa', 'semua', 'pernah', 'memberikan', 'beberapa', 'masa', 'selalu', 'baru',
  'sebuah', 'melihat', 'mendapatkan', 'memberi', 'bekerja', 'hidup', 'membuat', 'mengatakan', 'menggunakan', 'pergi'
]

// Daftar kata dalam bahasa Inggris
const englishWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
]

// Paragraf dalam bahasa Indonesia
const indonesianParagraphs = [
  'kehidupan di kota besar selalu penuh dengan aktivitas yang sibuk dan padat setiap harinya orang orang bergegas menuju tempat kerja atau sekolah dengan berbagai macam kendaraan di jalan raya suasana perkotaan yang ramai dengan gedung gedung tinggi dan lalu lintas yang tidak pernah berhenti membuat kita harus beradaptasi dengan cepat namun di balik semua kesibukan tersebut terdapat juga keindahan tersendiri yang bisa kita temukan seperti taman kota yang hijau atau kafe kafe nyaman untuk bersantai sejenak',
  'teknologi informasi telah mengubah cara kita berkomunikasi dan bekerja dalam beberapa tahun terakhir perkembangan internet dan perangkat mobile memungkinkan kita untuk terhubung dengan siapa saja di seluruh dunia hampir tanpa batas waktu dan jarak hal ini membuka peluang baru dalam berbagai bidang termasuk pendidikan bisnis dan hiburan namun di sisi lain kita juga perlu bijak dalam menggunakan teknologi agar tidak terjebak dalam ketergantungan atau masalah privasi yang mungkin timbul',
  'pendidikan merupakan salah satu faktor penting dalam membentuk masa depan seseorang melalui proses belajar kita dapat memperoleh pengetahuan keterampilan dan nilai nilai yang berguna untuk kehidupan di masyarakat sekolah dan universitas tidak hanya mengajarkan mata pelajaran akademik tetapi juga membantu mengembangkan karakter serta kemampuan sosial setiap individu dengan pendidikan yang baik seseorang memiliki peluang lebih besar untuk mencapai cita cita dan berkontribusi positif bagi lingkungan sekitarnya'
]

// Paragraf dalam bahasa Inggris
const englishParagraphs = [
  'the quick brown fox jumps over the lazy dog this sentence contains every letter in the english alphabet which makes it useful for testing typing speed and keyboard layouts practicing with such sentences can help improve your typing skills over time and make you more efficient when working with computers or other devices that require text input',
  'technology has transformed the way we live and work in the modern world from smartphones to artificial intelligence these innovations have made our lives more convenient and connected than ever before however it is important to use technology responsibly and be aware of potential challenges such as privacy concerns and the digital divide between different groups in society',
  'learning a new language can be both challenging and rewarding it opens up opportunities to connect with people from different cultures and access information from around the world while the process requires dedication and practice the benefits of being multilingual extend beyond communication to include cognitive advantages and career prospects in our globalized society'
]

export const getWordList = (language, mode) => {
  if (mode === 'words') {
    const wordArray = language === 'indonesia' ? indonesianWords : englishWords
    // Mengacak kata-kata dan mengambil 50 kata
    return [...wordArray]
      .sort(() => Math.random() - 0.5)
      .slice(0, 50)
  } else {
    const paragraphArray = language === 'indonesia' ? indonesianParagraphs : englishParagraphs
    // Memilih paragraf secara acak
    const randomIndex = Math.floor(Math.random() * paragraphArray.length)
    return [paragraphArray[randomIndex]]
  }
}