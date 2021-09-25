/* const mahasiswa = [
  "Amalia Prasetyawati",
  "Anjas Sri",
  "Arif Hadi",
  "Dikma Syahdana",
  "Dita Novia",
  "Dody Purnama",
  "Fachrihusaini",
  "Fahrizal Nurkholis",
  "Faisal Maulidani",
  "Firman Saputra",
  "Herman Syukur",
  "Iman Romansah",
  "Irvan Wahyu",
  "Kinanthi Wiena",
  "Lutfiah Sopiana",
  "Mariana Agustia",
  "Melana Dewi",
  "Muhammad Farhan",
  "Muhammad Irfan",
  "Okti Ruwahaeni",
  "Pramudika Syeh",
  "Putra Permana",
  "Ricky Bastanta",
  "Riris Sihite",
  "Saripudin",
  "Shendi Yulianti",
  "Slamet Ari",
  "Sulthan Hakim",
  "Sutri Ayu",
  "Taryana Sidik",
  "Theo Median",
  "Wardatumilah",
  "Widia Astuti",
  "Yuda Saputra",
  "Rizki Setiadi",
]; */

const rIdx = (arr) => Math.floor(Math.random() * (arr.length - 1 - 0) + 0);

const rPush = (a, b, cap) => {
  if (!b.length) return;
  if (a.length <= cap) {
    a.push(b.splice(rIdx(b), 1)[0]);
    rPush(a, b, cap);
  }
};

const group = (param, count) => {
  const cap = Math.floor(param.length / count);
  const a = [];
  const b = [...param];
  for (let i = 0; i < count; i++) a.push([]);
  for (let i = 0; i < a.length; i++) rPush(a[i], b, cap);
  return a;
};
