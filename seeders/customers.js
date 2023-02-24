const {
  sequelize: {
    models: {
      Product,
      Customer,
      Supplier,
      DeliveryType,
      ProductCategory,
      Region,
    },
  },
} = require("../models/index");

const customers = async () => {
  const [jakarta] = await Region.findOrCreate({
    where: {
      name: "Jakarta",
    },
    defaults: {
      name: "Jakarta",
    },
  });

  const [serpongAndBintaro] = await Region.findOrCreate({
    where: {
      name: "Serpong dan Bintaro",
    },
    defaults: {
      name: "Serpong dan Bintaro",
    },
  });

  const [karawaci] = await Region.findOrCreate({
    where: {
      name: "Karawaci",
    },
    defaults: {
      name: "Karawaci",
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Josie",
      phone: "0811 9729741",
    },
    defaults: {
      fullName: "Josie",
      phone: "0811 9729741",
      address: "Jalan Denpasar IV. No 44. Jakarta Selatan.",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Fenny Wijaya",
      phone: "0811 192180",
    },
    defaults: {
      fullName: "Fenny Wijaya",
      phone: "0811 192180",
      address: "Taman Kebon Jeruk Intercon Block C4 No 9",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Santy",
      phone: "0819 08306918",
    },
    defaults: {
      fullName: "Santy",
      phone: "0819 08306918",
      address: "Taman Kebun Jeruk Intercon Blok Q6 No 12",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Mulyati",
      phone: "0816 1167239",
    },
    defaults: {
      fullName: "Mulyati",
      phone: "0816 1167239",
      address: "MT Haryono Gang Sukarasa 3 No 26. Tangerang",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Mimi",
      phone: " 0878-8582-9732",
    },
    defaults: {
      fullName: "Mimi",
      phone: " 0878-8582-9732",
      address:
        "Ruko Odessa jl kelapa buan raya Blok AD 14/33 Toko Tehh pahit jaya sebelah jus kedungsari/sebrang dermaga food",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ria CA",
      phone: "+62 878 88070818",
    },
    defaults: {
      fullName: "Ria CA",
      phone: "+62 878 88070818",
      address:
        "Ayna Residence Ay/E-06 Jl Eldora Utama No 1210, Paku Jaya, Serpong Utara, Kota Tangerang Selatan, Banten 15324",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Shirleyta",
      phone: "0818 797393",
    },
    defaults: {
      fullName: "Shirleyta",
      phone: "0818 797393",
      address:
        "Taman Diponegoro, Jalan Gunung Jayawijaya No.52, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Rosa in Iawa",
      phone: "+62 818 165382",
    },
    defaults: {
      fullName: "Rosa in Iawa",
      phone: "+62 818 165382",
      address: "Beverly Golf JL. Danau Maninjau no 3",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Vera",
      phone: "0811 164441",
    },
    defaults: {
      fullName: "Vera",
      phone: "0811 164441",
      address: "Perumahan Citra 2 Ext Blok BF1 No.12, Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Julli JJ",
      phone: "0818 898264",
    },
    defaults: {
      fullName: "Julli JJ",
      phone: "0818 898264",
      address: "Perumahan Kembangan Baru. Blok B No.9. Puri Kembangan",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Fifi",
      phone: "+62 813 87313969",
    },
    defaults: {
      fullName: "Fifi",
      phone: "+62 813 87313969",
      address: "Fiordini 2/92 Illago",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yessi",
      phone: "+62 838 77229757",
    },
    defaults: {
      fullName: "Yessi",
      phone: "+62 838 77229757",
      address: "Jl Kelapa Lilin 7 blok ni3 no 10 kelapa gading jakarta utara",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Rita",
      phone: "0818841971",
    },
    defaults: {
      fullName: "Rita",
      phone: "0818841971",
      address: "Kav DKI Meruya, Jl. Putra Tunggal blok 141 no. 4",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Iin",
      phone: "0816 4248100",
    },
    defaults: {
      fullName: "Iin",
      phone: "0816 4248100",
      address: "Taman Kebun Jeruk Intercon Blok GB 1 No 14",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Caterin",
      phone: "0816 8421155",
    },
    defaults: {
      fullName: "Caterin",
      phone: "0816 8421155",
      address:
        "Taman Permata Buana. Jalan Pulau Ayer Raya No 24. Puri kembangan.",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Chirstin BPR",
      phone: "0878 77164103",
    },
    defaults: {
      fullName: "Chirstin BPR",
      phone: "0878 77164103",
      address: "Boulevar Palem Raya No 2109. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Dian",
      phone: "+62 811 9798387",
    },
    defaults: {
      fullName: "Dian",
      phone: "+62 811 9798387",
      address: "Jalan Janur Hijau XIII To 2 No 8 Jakarta 14240",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yane",
      phone: "0813 10565602",
    },
    defaults: {
      fullName: "Yane",
      phone: "0813 10565602",
      address: "Taman Kebon Jeruk Intercon Blok G1 No 71",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Titin",
      phone: "0813 86505010",
    },
    defaults: {
      fullName: "Titin",
      phone: "0813 86505010",
      address:
        "Taman Beverly Golf, Jalan Danau Maninjau, No.18, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Libri",
      phone: "0812 9291879",
    },
    defaults: {
      fullName: "Libri",
      phone: "0812 9291879",
      address: "Taman Permata Buana. Jalan Pulau Air 4 No.3",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Erline",
      phone: "+62 811 546589",
    },
    defaults: {
      fullName: "Erline",
      phone: "+62 811 546589",
      address: "Goldfinch Selatan No. 68 The Spring Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Anita Purwanti",
      phone: "0812 8243255",
    },
    defaults: {
      fullName: "Anita Purwanti",
      phone: "0812 8243255",
      address: "Kelapa Puan 14, Blok AG 8/7. Sektor 1A. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Rubi",
      phone: "0813 78999809",
    },
    defaults: {
      fullName: "Rubi",
      phone: "0813 78999809",
      address: "Taman Beverly Golf, Jalan Danau Limboto, No.35. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Marlin",
      phone: "0812 80787870",
    },
    defaults: {
      fullName: "Marlin",
      phone: "0812 80787870",
      address: "Danau Biru No 115. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Apo",
      phone: "+62 888 8530000",
    },
    defaults: {
      fullName: "Apo",
      phone: "+62 888 8530000",
      address: "Beryl Timur No. 35, Gadng Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Weny",
      phone: "+62 819 611970",
    },
    defaults: {
      fullName: "Weny",
      phone: "+62 819 611970",
      address: "Kebayoran Heights Blok KRA 1 no. 1 Bintaro Sektor 8",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yukti Liadi",
      phone: "+62 818 921535",
    },
    defaults: {
      fullName: "Yukti Liadi",
      phone: "+62 818 921535",
      address:
        "Mandala Utara No 23, Tomang. Jakarta Barat ( Dekat Dr Gigi SA Budiarjo)",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ima",
      phone: "+62 816 875887",
    },
    defaults: {
      fullName: "Ima",
      phone: "+62 816 875887",
      address: "Taman Permata Buana. Pulau Ubi 3 No 6 Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Olivia J Husada - Maryanti",
      phone: "+62 819 2888 7770",
    },
    defaults: {
      fullName: "Olivia J Husada - Maryanti",
      phone: "+62 819 2888 7770",
      address: "Kelapa puan XVI blok AF13 no 6, sektor 1A. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ely Tjoa",
      phone: "0813 11395008",
    },
    defaults: {
      fullName: "Ely Tjoa",
      phone: "0813 11395008",
      address: "Taman Kebun Jeruk Intercon, blok i7 No 9.",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Felice",
      phone: "0816 1901188",
    },
    defaults: {
      fullName: "Felice",
      phone: "0816 1901188",
      address: "Taman Cendana Golf. Jalan Pinus Golf. No 16. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Fanny Kosasih",
      phone: "0812 30007878",
    },
    defaults: {
      fullName: "Fanny Kosasih",
      phone: "0812 30007878",
      address: "Green Ville Blok AY No 12. Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Wei Wei",
      phone: "0812 8609831",
    },
    defaults: {
      fullName: "Wei Wei",
      phone: "0812 8609831",
      address: "Sektor 1A. Blok AG 8 No 14. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Angeline",
      phone: "+62 813 89115117",
    },
    defaults: {
      fullName: "Angeline",
      phone: "+62 813 89115117",
      address: "Boulevar Palem Raya no 2300. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Linda S",
      phone: "0811 133241",
    },
    defaults: {
      fullName: "Linda S",
      phone: "0811 133241",
      address: "Sutra Renata. Aurora 1/3. Seberang IKEA. Alam Sutera",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Linda Azalea",
      phone: "+6281290888933",
    },
    defaults: {
      fullName: "Linda Azalea",
      phone: "+6281290888933",
      address: "Azalea 1 no 73 ci",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Joyce Isoworo",
      phone: "+62 878-8286-8686",
    },
    defaults: {
      fullName: "Joyce Isoworo",
      phone: "+62 878-8286-8686",
      address: "Citra Garden",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Felice Teman Zaq",
      phone: "+62 8161901188",
    },
    defaults: {
      fullName: "Felice Teman Zaq",
      phone: "+62 8161901188",
      address:
        "Taman Diponegoro rolling g hills jalan Moreno Valley no 9 Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Vivi",
      phone: "0812 9228558",
    },
    defaults: {
      fullName: "Vivi",
      phone: "0812 9228558",
      address: "Taman Mediteranean. Telaga Elok No 29. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yosefin",
      phone: "0817 6300999",
    },
    defaults: {
      fullName: "Yosefin",
      phone: "0817 6300999",
      address: "Taman Kebun Jeruk Intercon, Blok E1, No.12",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Nathalie Hie",
      phone: "+62 822-1080-0080",
    },
    defaults: {
      fullName: "Nathalie Hie",
      phone: "+62 822-1080-0080",
      address: "Jeruk Mas Barat 3 blok D3 No. 11 Intercon",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Acien",
      phone: "+62 811 1730023",
    },
    defaults: {
      fullName: "Acien",
      phone: "+62 811 1730023",
      address: "Phinisi permai 6 no 10 Pantai Indah Kapuk Jakarta Utara",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Mia",
      phone: "+62 896 30368423",
    },
    defaults: {
      fullName: "Mia",
      phone: "+62 896 30368423",
      address: "Taman Ratu FV/1a, Duri Kepa Kebon Jeruk Jakarta Barat 11510",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ibu Dian Teman Christine",
      phone: "085947083607",
    },
    defaults: {
      fullName: "Ibu Dian Teman Christine",
      phone: "085947083607",
      address: "Tmaan Golf No 253 Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Stephanie",
      phone: "0811 1830170",
    },
    defaults: {
      fullName: "Stephanie",
      phone: "0811 1830170",
      address: "Taman Ubud Loka 6, No.30, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yenling",
      phone: "0817 172842",
    },
    defaults: {
      fullName: "Yenling",
      phone: "0817 172842",
      address: "Taman Golf Barat No.11, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yetly Ely",
      phone: "0811 883123",
    },
    defaults: {
      fullName: "Yetly Ely",
      phone: "0811 883123",
      address: "Fountainebleau Golf Residence No.73, BSD City",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Eva - Adik Dona",
      phone: "+62 878 08077714",
    },
    defaults: {
      fullName: "Eva - Adik Dona",
      phone: "+62 878 08077714",
      address: "The Eminent Cluster Vi Vacia Blok G9 No 12 BSD",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Lenata",
      phone: "",
    },
    defaults: {
      fullName: "Lenata",
      phone: "",
      address: "Jl. Tanjung Duren Utara 3 no. 188 Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Diana PS / DPS",
      phone: "0855 8812274",
    },
    defaults: {
      fullName: "Diana PS / DPS",
      phone: "0855 8812274",
      address: "Boulevar Palem Raya No 2311. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Shelly",
      phone: "0817 888589",
    },
    defaults: {
      fullName: "Shelly",
      phone: "0817 888589",
      address:
        "Pondok Hijau Golf, Cluster Jade, Jalan Jade Utara 2 No.8, Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ella",
      phone: "+62 816 1895153",
    },
    defaults: {
      fullName: "Ella",
      phone: "+62 816 1895153",
      address:
        "Pondok Hijau Golf Cluster Emerald Emerald Raya No 16 Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yulia",
      phone: "0811 855531",
    },
    defaults: {
      fullName: "Yulia",
      phone: "0811 855531",
      address: "Taman Beverly Golf. Danau Mahalona No 20. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Angela Jade",
      phone: "0813 10358800",
    },
    defaults: {
      fullName: "Angela Jade",
      phone: "0813 10358800",
      address: "Pondok Hijau Golf. Jade Utara No 46. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ita",
      phone: "0815 9777703",
    },
    defaults: {
      fullName: "Ita",
      phone: "0815 9777703",
      address: "Grisea Timur No. 17. The Spring. Gading Serpong.",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ching-ching Evi",
      phone: "+62 819 05202777",
    },
    defaults: {
      fullName: "Ching-ching Evi",
      phone: "+62 819 05202777",
      address: "Taman Bromo Gunung Putri No 12",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Christine Beverly",
      phone: "0819 887889",
    },
    defaults: {
      fullName: "Christine Beverly",
      phone: "0819 887889",
      address: "Taman Beverly Golf. Jalan Danau Semayang No 20. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yenti",
      phone: "+62 818 08195997",
    },
    defaults: {
      fullName: "Yenti",
      phone: "+62 818 08195997",
      address: "Daan Mogot Baru, kompleks Jl. Kintamani Timur I Blok LB no. 11",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Cing Cing",
      phone: "0811 790818",
    },
    defaults: {
      fullName: "Cing Cing",
      phone: "0811 790818",
      address: "Boulevar Palem Raya No 2008. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Lusy",
      phone: "+62 818 806277",
    },
    defaults: {
      fullName: "Lusy",
      phone: "+62 818 806277",
      address: "Citra 6 Orange Heliconia h5 No 7 Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Merry Tara",
      phone: "0819 08229178",
    },
    defaults: {
      fullName: "Merry Tara",
      phone: "0819 08229178",
      address: "Kemanggisan Utama VII No 9A. Slipi",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Liefung",
      phone: "+62 821 87788828",
    },
    defaults: {
      fullName: "Liefung",
      phone: "+62 821 87788828",
      address: "Alicante Timur 5 no 6 Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Citra",
      phone: "0813 82316229",
    },
    defaults: {
      fullName: "Citra",
      phone: "0813 82316229",
      address: "Taman kebun Jeruk Intercon, Blok L1 No 26.",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Anna Karawaci",
      phone: "0815 8928948",
    },
    defaults: {
      fullName: "Anna Karawaci",
      phone: "0815 8928948",
      address: "Taman Mediteranean. Telaga Elok No 26. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Kimi",
      phone: "0816 918971",
    },
    defaults: {
      fullName: "Kimi",
      phone: "0816 918971",
      address: "taman mediteranean  jln telaga warna 31 lippo karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ika Sani",
      phone: "+62 (0) 812 88188008",
    },
    defaults: {
      fullName: "Ika Sani",
      phone: "+62 (0) 812 88188008",
      address:
        "The Windsor Apartment, Unit 2172 Jl. Puri Indah Blok S, Kembangan Selatan 11610",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ivone",
      phone: "0813 35552885",
    },
    defaults: {
      fullName: "Ivone",
      phone: "0813 35552885",
      address: "Taman Permata Millenium. C10. No. 23. Lippo Karawaci.",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Diana BSD",
      phone: "0821 12222279",
    },
    defaults: {
      fullName: "Diana BSD",
      phone: "0821 12222279",
      address: "Greenwich Park. Cluster Mayfield A7 No 11. BSD City",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Melinda",
      phone: "0815 1816677",
    },
    defaults: {
      fullName: "Melinda",
      phone: "0815 1816677",
      address: "Taman Diponegoro, Jalan Gunung Mahkota. No.89. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ainon 1",
      phone: "0811 865262",
    },
    defaults: {
      fullName: "Ainon 1",
      phone: "0811 865262",
      address:
        "Taman Mediteranean Golf. Jalan Sriwijaya Golf No 28. Lippo Karawaci.",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Kristin W - Ipar Alin",
      phone: "+62 81385438330",
    },
    defaults: {
      fullName: "Kristin W - Ipar Alin",
      phone: "+62 81385438330",
      address: "Diamond Golf E7 Pantai Indah Kapuk, Jakarta Utara 14470",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Hannah",
      phone: "0815 9906969",
    },
    defaults: {
      fullName: "Hannah",
      phone: "0815 9906969",
      address: "Perumahan Citra 1 Ext Blok AA 4 No 3. Kalideres",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ancella",
      phone: "+62 (0) 813 89188811",
    },
    defaults: {
      fullName: "Ancella",
      phone: "+62 (0) 813 89188811",
      address: "Taman Golf. Jalan Laguna Golf No 7. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Fani",
      phone: "+62 812 8858 8577",
    },
    defaults: {
      fullName: "Fani",
      phone: "+62 812 8858 8577",
      address: "Bavaria 2 No. 1 Modernland Tangerang",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Effie",
      phone: "+62 816 716007",
    },
    defaults: {
      fullName: "Effie",
      phone: "+62 816 716007",
      address: "Dharmawangsa Apt Tower 2 Unit 2808",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Indri",
      phone: "0812 9392178",
    },
    defaults: {
      fullName: "Indri",
      phone: "0812 9392178",
      address: "Taman Permata Buana. Buana Biru Besar 2 No 36.",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Marinee",
      phone: "0812 9469999",
    },
    defaults: {
      fullName: "Marinee",
      phone: "0812 9469999",
      address: "Taman Golf No. 339. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Prillia",
      phone: "0812 8481973",
    },
    defaults: {
      fullName: "Prillia",
      phone: "0812 8481973",
      address: "Jalan Airlangga II, No.17. Selong, Kebayoran Baru",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ria",
      phone: "Unknown",
    },
    defaults: {
      fullName: "Ria",
      phone: "Unknown",
      address: "Taman Kebon Jeruk Blok 17 No. 28",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Sylvi",
      phone: "0815 6045466",
    },
    defaults: {
      fullName: "Sylvi",
      phone: "0815 6045466",
      address: "Komplek Palem Semi, Jalan Palem Sirai, No.29, Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Imelda",
      phone: "+62 821 31111160",
    },
    defaults: {
      fullName: "Imelda",
      phone: "+62 821 31111160",
      address: "Sektor 1E, Blok BD 13 No 21. Gading Serpong. Tangerang",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Anas",
      phone: "0819 15544412",
    },
    defaults: {
      fullName: "Anas",
      phone: "0819 15544412",
      address: "Sutera Asri 2 No 11A. Alam Sutera.",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Enie",
      phone: "0811 993737",
    },
    defaults: {
      fullName: "Enie",
      phone: "0811 993737",
      address: "Taman Golf. Cluster Royal Golf No 6. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yustina",
      phone: "0811967944",
    },
    defaults: {
      fullName: "Yustina",
      phone: "0811967944",
      address: "Pondok Hijau Golf Emerald Selatan 3 no 27",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yung Hwa",
      phone: "0812 90575543",
    },
    defaults: {
      fullName: "Yung Hwa",
      phone: "0812 90575543",
      address: "Imperial Drive ID56 Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ranny",
      phone: "0815 8937933",
    },
    defaults: {
      fullName: "Ranny",
      phone: "0815 8937933",
      address: "Pondok Hijau Golf. Jade Utara no 47. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Christy Widjaja",
      phone: "+62 812 12709567",
    },
    defaults: {
      fullName: "Christy Widjaja",
      phone: "+62 812 12709567",
      address: "Taman Cendana Jl. Ebony Golf no 8",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Tere",
      phone: "+62 815 78184151",
    },
    defaults: {
      fullName: "Tere",
      phone: "+62 815 78184151",
      address: "Cluster Taman Bambu Block A no 11, Bojong Nangka",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Grace",
      phone: "0816895172",
    },
    defaults: {
      fullName: "Grace",
      phone: "0816895172",
      address: "Sutera Tiara 6 No 7. Alam Sutera",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ekcin",
      phone: "0816 1117711",
    },
    defaults: {
      fullName: "Ekcin",
      phone: "0816 1117711",
      address: "Danau Biru No 35 - 37. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Amelia",
      phone: "0817 857818",
    },
    defaults: {
      fullName: "Amelia",
      phone: "0817 857818",
      address: "Luxmore GA 2 / 7, Greenwich Park. BSD City",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yoana",
      phone: "0821 10635635",
    },
    defaults: {
      fullName: "Yoana",
      phone: "0821 10635635",
      address: "Pondok Hijau Golf. Jade Utara 1 No 7. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Joyce",
      phone: "0811 194168",
    },
    defaults: {
      fullName: "Joyce",
      phone: "0811 194168",
      address: "Taman Himalaya. Gunung Himalaya No 56, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Vero",
      phone: "0816 1160805",
    },
    defaults: {
      fullName: "Vero",
      phone: "0816 1160805",
      address: "",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Sanny",
      phone: "+62 811-1159-999",
    },
    defaults: {
      fullName: "Sanny",
      phone: "+62 811-1159-999",
      address:
        "Jln. Ametis 1. No. 23 blok F Permata Hijau, Jakarta Selatan (Belakang ITC Permata hijau)",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Mary",
      phone: "0818 742055",
    },
    defaults: {
      fullName: "Mary",
      phone: "0818 742055",
      address: "Victoria River Park. A2 No. 9. BSD City",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Linda Boenyamin",
      phone: "+62 811 8283 999",
    },
    defaults: {
      fullName: "Linda Boenyamin",
      phone: "+62 811 8283 999",
      address: "Taman Lebak Bulus 3 Y3",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Nining",
      phone: "+62 817 888126",
    },
    defaults: {
      fullName: "Nining",
      phone: "+62 817 888126",
      address: "Pondok Hijau Golf. Jade Selatan 1 no 12. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Elvina",
      phone: "+62 816 1110685",
    },
    defaults: {
      fullName: "Elvina",
      phone: "+62 816 1110685",
      address: "Taman Semanan Indah Blok B1 No 20 Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ming-ming",
      phone: "+62 815 9696861",
    },
    defaults: {
      fullName: "Ming-ming",
      phone: "+62 815 9696861",
      address: "Taman Alfa Indah blok J7 / 24",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Angela Flourite",
      phone: "0855 1117779",
    },
    defaults: {
      fullName: "Angela Flourite",
      phone: "0855 1117779",
      address: "Fluorite Timur 3 No 5. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Susana Riyadi",
      phone: "081938999000",
    },
    defaults: {
      fullName: "Susana Riyadi",
      phone: "081938999000",
      address: "Taman Kebun Jeruk Intercon. Jalan Jeruk Papua Blok H2 no 20",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yessy",
      phone: "+62 812 12696901",
    },
    defaults: {
      fullName: "Yessy",
      phone: "+62 812 12696901",
      address: "Taman Bromo Gunung Davos no 20",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Christine Londongan",
      phone: "0812 8000166",
    },
    defaults: {
      fullName: "Christine Londongan",
      phone: "0812 8000166",
      address: "Taman Permata Ayu I Blok D13 No 6. Sektor 6. Lippo Krwc",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Leeini",
      phone: "0813 10109100",
    },
    defaults: {
      fullName: "Leeini",
      phone: "0813 10109100",
      address:
        "Apartment St.Moritz. Tower New Ambassador. Unit 1203. Puri Indah",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Susan Tanandika",
      phone: "+62 813 88009988",
    },
    defaults: {
      fullName: "Susan Tanandika",
      phone: "+62 813 88009988",
      address:
        "Taman Resort Mediterania Z7/18 Pantai Indah Kapuk Jakarta Utara 14460",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Umi",
      phone: "0816 777148",
    },
    defaults: {
      fullName: "Umi",
      phone: "0816 777148",
      address: "Graha Hijau 2. Blok D No 31. Ciputat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Wiwiek",
      phone: "0816 764151",
    },
    defaults: {
      fullName: "Wiwiek",
      phone: "0816 764151",
      address: "Apartment Dharmawangsa. Unit 2009, Tower 2",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Siana",
      phone: "0816 782325",
    },
    defaults: {
      fullName: "Siana",
      phone: "0816 782325",
      address: "Taman Golf No 320. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yunita",
      phone: "0818 07073819",
    },
    defaults: {
      fullName: "Yunita",
      phone: "0818 07073819",
      address: "Jln K 1 No 14. Cipinang Muara",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Anna Jade",
      phone: "0878 71955855",
    },
    defaults: {
      fullName: "Anna Jade",
      phone: "0878 71955855",
      address: "Pondok Hijau Golf. Jade Utara No 55. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Lilyan - Kawan Yani SMA",
      phone: "+62 812-9154-489",
    },
    defaults: {
      fullName: "Lilyan - Kawan Yani SMA",
      phone: "+62 812-9154-489",
      address: "Paramount Hill Golf",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Violin",
      phone: "0815 8800585",
    },
    defaults: {
      fullName: "Violin",
      phone: "0815 8800585",
      address:
        "Pondok Hijau Golf, Cluster Jade, Jalan Jade Utara No.53, Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ellen Teman Yanty Sayur",
      phone: "+62 813 14214035",
    },
    defaults: {
      fullName: "Ellen Teman Yanty Sayur",
      phone: "+62 813 14214035",
      address: "Gamet Barat 2/19",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Andrea Adik Ika",
      phone: "+62 877 11773010",
    },
    defaults: {
      fullName: "Andrea Adik Ika",
      phone: "+62 877 11773010",
      address: "Taman Bromo Gunung Putri No. 21",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Inge",
      phone: "0812 82870116",
    },
    defaults: {
      fullName: "Inge",
      phone: "0812 82870116",
      address: "Paramount Serpong. Cluster Azalea 3 No 75. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Henny Chan - Teman Anita Simin",
      phone: "+62 881 1133388",
    },
    defaults: {
      fullName: "Henny Chan - Teman Anita Simin",
      phone: "+62 881 1133388",
      address: "Citra Garden 2 Blok L5 No 14",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Steffi",
      phone: "0812 2374931",
    },
    defaults: {
      fullName: "Steffi",
      phone: "0812 2374931",
      address:
        "Apartment Metro Park Residence, Unit MA 6AB, Kedoya, Kebun Jeruk atau 'Riviera at Puri'",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Jane",
      phone: "+62 818 893773",
    },
    defaults: {
      fullName: "Jane",
      phone: "+62 818 893773",
      address: "Jl. Kalimantan 889. Lippo Karawaci Utara",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Willya",
      phone: "0818 669983",
    },
    defaults: {
      fullName: "Willya",
      phone: "0818 669983",
      address: "Residence 28. Unit 1J, Jalan Panjang, Kavling 28, Kedoya",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Florence",
      phone: "0816 1913889",
    },
    defaults: {
      fullName: "Florence",
      phone: "0816 1913889",
      address: "Pondok Hijau Golf. Jade Selatan 1 No 30. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Sissy",
      phone: "0811 998303",
    },
    defaults: {
      fullName: "Sissy",
      phone: "0811 998303",
      address:
        "Taman Diponegoro, Jalan Gunung Atlantik, No.108, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Lea",
      phone: "+62 822 11565331",
    },
    defaults: {
      fullName: "Lea",
      phone: "+62 822 11565331",
      address: "Grandview Karawaci Cluster Minde Vista B6/11",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Lise",
      phone: "0812 8825490",
    },
    defaults: {
      fullName: "Lise",
      phone: "0812 8825490",
      address:
        "Taman Mediteranean Golf. Jalan Darmawangsa Golf. No.10. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yuriko",
      phone: "0859 59198777",
    },
    defaults: {
      fullName: "Yuriko",
      phone: "0859 59198777",
      address: "Janur Hijau 1, Blok AH 11/3, Sektor 1A, Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Linda Koesno",
      phone: "0816 810189",
    },
    defaults: {
      fullName: "Linda Koesno",
      phone: "0816 810189",
      address: "Taman Mediteranea. Telaga Biru No 87. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Linda Salim",
      phone: "+62 878 88588933",
    },
    defaults: {
      fullName: "Linda Salim",
      phone: "+62 878 88588933",
      address: "The Marina Coast Royal Residence Blok C1A no 8",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Suzie",
      phone: "0816 710011",
    },
    defaults: {
      fullName: "Suzie",
      phone: "0816 710011",
      address: "Taman Diponegoro, Jalan Mandala, No.20, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Pauline Pypy",
      phone: "+62 815 8157 488",
    },
    defaults: {
      fullName: "Pauline Pypy",
      phone: "+62 815 8157 488",
      address: "Jln Ki Kimung Blok BK No 109, Cipinang Elok II, Jakarta Timur",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Luwis",
      phone: "0812 8548954",
    },
    defaults: {
      fullName: "Luwis",
      phone: "0812 8548954",
      address:
        "Taman Diponegoro, Jalan Gunung Himalaya. No 130. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Henny Chen CA",
      phone: "+62 815 10010188",
    },
    defaults: {
      fullName: "Henny Chen CA",
      phone: "+62 815 10010188",
      address: "Kelapa Puan XVIII Blok aja2 no 27 Sektor 1 a gading serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Evie",
      phone: "0812 9006636",
    },
    defaults: {
      fullName: "Evie",
      phone: "0812 9006636",
      address: "Wang Residence Unit 9D. Jalan Panjang Kav 18.",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Erma - Teman Santy Tukiman",
      phone: "+62 816 1649 999",
    },
    defaults: {
      fullName: "Erma - Teman Santy Tukiman",
      phone: "+62 816 1649 999",
      address:
        "Pakubuwono residence Unit Eaglewood 9b jl. Pakubuono 6/68 Keb. Baru",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Jenny H",
      phone: "0811 888998",
    },
    defaults: {
      fullName: "Jenny H",
      phone: "0811 888998",
      address:
        "Taman Raya Golf Boulevard. Blok G4 No 228. Modernland. Tangerang",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Mercy",
      phone: "0816 1805422",
    },
    defaults: {
      fullName: "Mercy",
      phone: "0816 1805422",
      address: "Cluster Michelia 5 Blok MI 5 No 20. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Evi Sentani",
      phone: "0815 84003888",
    },
    defaults: {
      fullName: "Evi Sentani",
      phone: "0815 84003888",
      address: "Taman Beverly Golf. Jalan Sentani No 7. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ninik",
      phone: "0816 902888",
    },
    defaults: {
      fullName: "Ninik",
      phone: "0816 902888",
      address: "Taman Permata Buana. Pulau Sebaru Blok L5 No 28",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yuliana",
      phone: "0811 1992607",
    },
    defaults: {
      fullName: "Yuliana",
      phone: "0811 1992607",
      address: "Taman Pattaya 3, No.33, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Hanny",
      phone: "0812 8567088",
    },
    defaults: {
      fullName: "Hanny",
      phone: "0812 8567088",
      address: "Modernland. Taman Raya Golf Boulevard Kav G III No 57",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Mei Ling",
      phone: "0818 789567",
    },
    defaults: {
      fullName: "Mei Ling",
      phone: "0818 789567",
      address: "Boulevard Palem Raya No.2203. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yanty Pascal",
      phone: "0812 80216425",
    },
    defaults: {
      fullName: "Yanty Pascal",
      phone: "0812 80216425",
      address:
        "Cluster Pascal, Jalan Pascal Barat 3 No.32, Scientia, Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Dona",
      phone: "0818 08020465",
    },
    defaults: {
      fullName: "Dona",
      phone: "0818 08020465",
      address: "Taman Beverly Golf. Jalan Danau Semayang No 23. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yenny Susanti - Ipar Ella",
      phone: "+62 818 06257878",
    },
    defaults: {
      fullName: "Yenny Susanti - Ipar Ella",
      phone: "+62 818 06257878",
      address: "Taman Permata BuanaJal an Buana Biru Besar No 33Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Fenny James",
      phone: "0817 9882001",
    },
    defaults: {
      fullName: "Fenny James",
      phone: "0817 9882001",
      address: "Taman Diponegoro. Gunung Mahkota No 59. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Linda Massie",
      phone: "0878 86560104",
    },
    defaults: {
      fullName: "Linda Massie",
      phone: "0878 86560104",
      address: "Kembang Asri I blok B4 No 11. Puri Indah",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Anas Citra",
      phone: "+62 818 734000",
    },
    defaults: {
      fullName: "Anas Citra",
      phone: "+62 818 734000",
      address: "Citra Garden 3 Block a7 no 31 Kalideres",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Fiani",
      phone: "087775959596",
    },
    defaults: {
      fullName: "Fiani",
      phone: "087775959596",
      address: "The Springs. Goldfinch Selatan No 27. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Agnes",
      phone: "+62 818 779562",
    },
    defaults: {
      fullName: "Agnes",
      phone: "+62 818 779562",
      address: "Jl. Sutera Intan 2/26 Alam Sutera",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Susan Jade",
      phone: "0816 863383",
    },
    defaults: {
      fullName: "Susan Jade",
      phone: "0816 863383",
      address: "Pondok Hijau Golf. Jade Selatan No 15. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Michelle",
      phone: "0812 2307868",
    },
    defaults: {
      fullName: "Michelle",
      phone: "0812 2307868",
      address:
        "Residence 28. Unit 6M. Jalan Panjang. Kavling 28, Kedoya, Kebun Jeruk",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Suse",
      phone: "0812 90004889",
    },
    defaults: {
      fullName: "Suse",
      phone: "0812 90004889",
      address: "Jalan Pantai Sanur 6, No.16, Ancol, Jakarta Utara",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Sundari",
      phone: "0878 87888068",
    },
    defaults: {
      fullName: "Sundari",
      phone: "0878 87888068",
      address: "Taman Mediteranean Golf, Jalan Brawijaya No.60, Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Fen",
      phone: "0815 9270098",
    },
    defaults: {
      fullName: "Fen",
      phone: "0815 9270098",
      address: "De Park BSD. Cluster De Maja Unit E15 No 5. BSD",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Heny",
      phone: "0811 817055",
    },
    defaults: {
      fullName: "Heny",
      phone: "0811 817055",
      address: "Taman Diponegoro. Gunung Arjuna No 30. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Susan Wijaya",
      phone: "0816 857405",
    },
    defaults: {
      fullName: "Susan Wijaya",
      phone: "0816 857405",
      address: "Taman Permata Buana. Pulau Nirwana 5 H7 No 19",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Natalia",
      phone: "0812 91119780",
    },
    defaults: {
      fullName: "Natalia",
      phone: "0812 91119780",
      address: "Taman Diponegoro. Gunung Pelangi No 27. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Katryn",
      phone: "0811 817648",
    },
    defaults: {
      fullName: "Katryn",
      phone: "0811 817648",
      address:
        "Residence 28. Unit 1S. Jalan Panjang No.28. Kedoya. Kebun Jeruk.",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Nelly",
      phone: "+62 811 8888425",
    },
    defaults: {
      fullName: "Nelly",
      phone: "+62 811 8888425",
      address: "Sutera Alba 1 no 16. Cluster Renata - alba. Alam Sutera",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Fonny",
      phone: "0811 152805",
    },
    defaults: {
      fullName: "Fonny",
      phone: "0811 152805",
      address: "Green Garden. Blok M4. No 19. Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Wely Tjaja - Teman Hanny",
      phone: "+62 817-119-961",
    },
    defaults: {
      fullName: "Wely Tjaja - Teman Hanny",
      phone: "+62 817-119-961",
      address:
        "Indah Tour Perkantoran puri niaga 2 Jl puri kencana blok J1/1-V Kembangan Jkt barat 11610",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Lily Ang",
      phone: "+62 813 88809898",
    },
    defaults: {
      fullName: "Lily Ang",
      phone: "+62 813 88809898",
      address: "Jl. Tanjung Duren Timur 6 no 195 Jakarta 11470",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Stephanie Djaja",
      phone: "+62 818 991988",
    },
    defaults: {
      fullName: "Stephanie Djaja",
      phone: "+62 818 991988",
      address: "Sunter Agung Perkasa 10 block j13",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ana Azalea",
      phone: "+62 817 0999809",
    },
    defaults: {
      fullName: "Ana Azalea",
      phone: "+62 817 0999809",
      address: "Azalea 2 No 9. Gading Serpong.",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Meilin",
      phone: "0811 8887122",
    },
    defaults: {
      fullName: "Meilin",
      phone: "0811 8887122",
      address: "Pondok Hijau Golf. Cluster Chalcedony No.17. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Anita Simin",
      phone: "0816 1312255",
    },
    defaults: {
      fullName: "Anita Simin",
      phone: "0816 1312255",
      address: "Taman Surya 5, Blok GG 4 No 53. Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Felicity Mel / Mel",
      phone: "0878 81517567",
    },
    defaults: {
      fullName: "Felicity Mel / Mel",
      phone: "0878 81517567",
      address: "Jl Dr Kusuma Atmadja No 56. Menteng",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Viri",
      phone: "+62 817 776689",
    },
    defaults: {
      fullName: "Viri",
      phone: "+62 817 776689",
      address: "Greenville blok AU no 24",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Chelsia",
      phone: "0813 18890363",
    },
    defaults: {
      fullName: "Chelsia",
      phone: "0813 18890363",
      address: "Sunrise Garden. Surya Wahana Blok 3J No 4. Kedoya",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Linda Teman Ci wei",
      phone: "+62812-1886-3788",
    },
    defaults: {
      fullName: "Linda Teman Ci wei",
      phone: "+62812-1886-3788",
      address: "Sektor 1A Jl. Kelapa Puan 13 - AG 6/11",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Sri",
      phone: "0815 9318120",
    },
    defaults: {
      fullName: "Sri",
      phone: "0815 9318120",
      address: "Pondok Hijau Golf. Emerald Utara 3 No 2",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Murtini",
      phone: "0818 07781762",
    },
    defaults: {
      fullName: "Murtini",
      phone: "0818 07781762",
      address: "Jalan Tawakal Ujung No 13, Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Efi Riani Wiradjaja",
      phone: "+62 816-1133-611",
    },
    defaults: {
      fullName: "Efi Riani Wiradjaja",
      phone: "+62 816-1133-611",
      address:
        "Taman Cendana Golf Jl. Beringing Golf No. 72, Lippo Karawaci Tangerang 15810",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Rike",
      phone: "0812 88327373",
    },
    defaults: {
      fullName: "Rike",
      phone: "0812 88327373",
      address: "Pondok Hijau Golf. Garnet Barat 2 No 6. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Vie",
      phone: "0812 88888709",
    },
    defaults: {
      fullName: "Vie",
      phone: "0812 88888709",
      address: "Pondok Hijau Golf. Amethyst Raya No 5. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Hilda",
      phone: "0816 1126731",
    },
    defaults: {
      fullName: "Hilda",
      phone: "0816 1126731",
      address: "Taman Pattaya. Pattaya 1 No 11. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Siska",
      phone: "0812 80022023",
    },
    defaults: {
      fullName: "Siska",
      phone: "0812 80022023",
      address: "Taman Diponegoro. Gunung Cempaka No 58",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Erina",
      phone: "0858 10303008",
    },
    defaults: {
      fullName: "Erina",
      phone: "0858 10303008",
      address: "Pondok Hijau Golf. Aquamarine Utara 3 No 18",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ifony",
      phone: "0818 866423",
    },
    defaults: {
      fullName: "Ifony",
      phone: "0818 866423",
      address: "Taman Golf No. 215. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Liany",
      phone: "0818 06999048",
    },
    defaults: {
      fullName: "Liany",
      phone: "0818 06999048",
      address: "Prof. Moh. Yamin. No.51. Menteng",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Isabella - Lala",
      phone: "+62 818-0903-0098",
    },
    defaults: {
      fullName: "Isabella - Lala",
      phone: "+62 818-0903-0098",
      address: "Jalan Janur Hijau XI TR1/10, Kelapa Gading",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Lulu YLEO",
      phone: "+62 811 164941",
    },
    defaults: {
      fullName: "Lulu YLEO",
      phone: "+62 811 164941",
      address: "Jl Beringin Golf No. 6 Taman Cendana Golf Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "May Dio",
      phone: "0812 9213293",
    },
    defaults: {
      fullName: "May Dio",
      phone: "0812 9213293",
      address:
        "Jalan Kelapa Puan XXIV. Blok AK4. No. 66. Sektor 1G. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Dhini",
      phone: "081212072810",
    },
    defaults: {
      fullName: "Dhini",
      phone: "081212072810",
      address: "Taman Kebun Jeruk Intercon Blok L1 no 26",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yetty",
      phone: "0811 1776886",
    },
    defaults: {
      fullName: "Yetty",
      phone: "0811 1776886",
      address:
        "Jalan Kelapa Puan XXI Blok AH 8, No.9, Sektor 1A, Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Aicu",
      phone: "0857 19630708",
    },
    defaults: {
      fullName: "Aicu",
      phone: "0857 19630708",
      address: "Kelapa Puan 12. Blok AF5 N0 5. Sektor 1A. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Soen",
      phone: "+62 838 34751986",
    },
    defaults: {
      fullName: "Soen",
      phone: "+62 838 34751986",
      address: "Jl. Jatinegara Barat II no 13 RT 13/RW 03 Jaktim 1",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Dhyana",
      phone: "0818 08241950",
    },
    defaults: {
      fullName: "Dhyana",
      phone: "0818 08241950",
      address: "Pondok Hijau Golf. Turquoise Timur 1 no 18. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Evelyn",
      phone: "0817 0014777",
    },
    defaults: {
      fullName: "Evelyn",
      phone: "0817 0014777",
      address:
        "Taman Beverly Golf. Jalan Danau Borobudur No 11. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ansye - Teman Lucy Karawaci",
      phone: "+62 818 847380",
    },
    defaults: {
      fullName: "Ansye - Teman Lucy Karawaci",
      phone: "+62 818 847380",
      address:
        "Ansye WinartoJl. Asia Baru 2 Blok B2 no.48Ke paduri - Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Melly",
      phone: "+62 817 4951964",
    },
    defaults: {
      fullName: "Melly",
      phone: "+62 817 4951964",
      address: "Janur Elok 7 Blok Qi no 1 kelapa gading",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Peggy",
      phone: "0816 1954745",
    },
    defaults: {
      fullName: "Peggy",
      phone: "0816 1954745",
      address: "Taman Aries Blok F5 No 8",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Toto",
      phone: "0812 9236667",
    },
    defaults: {
      fullName: "Toto",
      phone: "0812 9236667",
      address: "Kemanggisan Utama 5, No.23G, Jakarta Barat",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Lucia",
      phone: "+62 821 77778044",
    },
    defaults: {
      fullName: "Lucia",
      phone: "+62 821 77778044",
      address: "Taman Mediterranean Gold Jl Madiun Golf No. 31",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Nita",
      phone: "0811 111373",
    },
    defaults: {
      fullName: "Nita",
      phone: "0811 111373",
      address: "Pondok Hijau Golf. Crown Selatan 3 No 20. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Olive",
      phone: "0811 1920506",
    },
    defaults: {
      fullName: "Olive",
      phone: "0811 1920506",
      address:
        "Taman Kebun Jeruk Intercon blok i7 No 1. Depan sekolah bukit sion",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Maryanti",
      phone: "0816 1924179",
    },
    defaults: {
      fullName: "Maryanti",
      phone: "0816 1924179",
      address: "Alam Sutera. Sutera Jelita 2 No 55",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Mery Chang",
      phone: "0822 60798886",
    },
    defaults: {
      fullName: "Mery Chang",
      phone: "0822 60798886",
      address:
        "Pondok Hijau Golf. Cluster Ruby, Jalan Ruby Timur 3, No. 8. Gading Serpong",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Yunitasari",
      phone: "+62 812 83519703",
    },
    defaults: {
      fullName: "Yunitasari",
      phone: "+62 812 83519703",
      address: "Giri Loka 2 blok Q no 53. BSD sektor IV Tangerang Selatan",
      rsMember: true,
      RegionId: serpongAndBintaro.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Liliana",
      phone: "081905558588",
    },
    defaults: {
      fullName: "Liliana",
      phone: "081905558588",
      address:
        "Durimas 1 blok D no 94 Durikepa Kebun Jeruk Jakarta Barat Kode Pos 11510",
      rsMember: true,
      RegionId: jakarta.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Zaq",
      phone: "0812 19901977",
    },
    defaults: {
      fullName: "Zaq",
      phone: "0812 19901977",
      address: "Taman Diponegoro. Gunung Himalaya No 201. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Adriani",
      phone: "0818 860246",
    },
    defaults: {
      fullName: "Adriani",
      phone: "0818 860246",
      address: "Taman Cendana Golf. Cemara Golf No 18. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });

  await Customer.findOrCreate({
    where: {
      fullName: "Ika",
      phone: "0877 74274479",
    },
    defaults: {
      fullName: "Ika",
      phone: "0877 74274479",
      address: "Taman Bromo. Jalan Gunung Tretes. No. 12. Lippo Karawaci",
      rsMember: true,
      RegionId: karawaci.id,
    },
  });
};

module.exports = customers;
