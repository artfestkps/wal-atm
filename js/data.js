/**
 * Ummath APP - Waltakun'26 Data Engine
 * Embedded dataset from Google Sheets PDF OCR + Live Sync fetcher logic with forward-fill.
 */

const DEFAULT_LIVE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzavtR-ozojZhaoht3c8MtVUN0iy1126DE_pCQd712T_cg6nTYxDcJNxdv7HXF0sec0/exec";

const DEFAULT_STUDENTS = [
  // SUB JUNIOR (S1 & S2)
  { chestNo: "663", name: "MUHAMMED RIYAN T", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "663", driveId: "1dmzDiREDbU22jcGC6PFdFC-Ub7NH6m2x" },
  { chestNo: "664", name: "MUHAMMED RABEEH PT", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "664", driveId: "1dmzDiREDbU22jcGC6PFdFC-Ub7NH6m2x" },
  { chestNo: "665", name: "ABAN AHMED A", class: "S1", category: "SUB JUNIOR", team: "QIYADAH", password: "665", driveId: "1dmzDiREDbU22jcGC6PFdFC-Ub7NH6m2x" },
  { chestNo: "666", name: "MUHAMMED SALIM KK", class: "S1", category: "SUB JUNIOR", team: "RIFADAH", password: "666", driveId: "1dmzDiREDbU22jcGC6PFdFC-Ub7NH6m2x" },
  { chestNo: "667", name: "AAQILUL HAQ P P", class: "S1", category: "SUB JUNIOR", team: "RIFADAH", password: "667", driveId: "1dmzDiREDbU22jcGC6PFdFC-Ub7NH6m2x" },
  { chestNo: "668", name: "MUHAMMED SHAZIL P", class: "S1", category: "SUB JUNIOR", team: "QIYADAH", password: "668", driveId: "1dmzDiREDbU22jcGC6PFdFC-Ub7NH6m2x" },
  { chestNo: "669", name: "MUHAMMAD HADHI K", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "669", driveId: "" },
  { chestNo: "670", name: "MUHAMMAD ANFAH K", class: "S1", category: "SUB JUNIOR", team: "QIYADAH", password: "670", driveId: "" },
  { chestNo: "671", name: "MUHAMMED SHAMIL TP", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "671", driveId: "" },
  { chestNo: "672", name: "MUSAFIR MUSTHAFA", class: "S1", category: "SUB JUNIOR", team: "WIFADAH", password: "672", driveId: "" },
  { chestNo: "673", name: "MUHAMMED SHAMIL PC", class: "S1", category: "SUB JUNIOR", team: "RIFADAH", password: "673", driveId: "" },
  { chestNo: "674", name: "AHMED HATHIM.T", class: "S1", category: "SUB JUNIOR", team: "QIYADAH", password: "674", driveId: "" },
  { chestNo: "675", name: "MUHAMMAD NIHAL K", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "675", driveId: "" },
  { chestNo: "676", name: "MUHAMMED ASLAH A", class: "S1", category: "SUB JUNIOR", team: "RIFADAH", password: "676", driveId: "" },
  { chestNo: "677", name: "FAIZAN K", class: "S1", category: "SUB JUNIOR", team: "WIFADAH", password: "677", driveId: "" },
  { chestNo: "678", name: "MUHAMMED SWALIH PT", class: "S1", category: "SUB JUNIOR", team: "RIFADAH", password: "678", driveId: "" },
  { chestNo: "679", name: "MUHAMMED FARHAN", class: "S1", category: "SUB JUNIOR", team: "QIYADAH", password: "679", driveId: "" },
  { chestNo: "680", name: "MOHAMMAD RADIN K", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "680", driveId: "" },
  { chestNo: "681", name: "MUHAMMED JAYYASH", class: "S1", category: "SUB JUNIOR", team: "RIFADAH", password: "681", driveId: "" },
  { chestNo: "682", name: "MUHAMMED RAYYAN", class: "S1", category: "SUB JUNIOR", team: "WIFADAH", password: "682", driveId: "" },
  { chestNo: "683", name: "IBRAHEEM C M", class: "S1", category: "SUB JUNIOR", team: "WIFADAH", password: "683", driveId: "" },
  { chestNo: "695", name: "MUHAMMED SHAZIN A", class: "S1", category: "SUB JUNIOR", team: "WIFADAH", password: "695", driveId: "" },
  { chestNo: "685", name: "AMEEN ABDULLA. MK", class: "S1", category: "SUB JUNIOR", team: "QIYADAH", password: "685", driveId: "" },
  { chestNo: "686", name: "MUHAMMED", class: "S1", category: "SUB JUNIOR", team: "WIFADAH", password: "686", driveId: "" },
  { chestNo: "687", name: "MUHAMMED ABIYAN. T.T", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "687", driveId: "" },
  { chestNo: "688", name: "LUTHF JAMAL P", class: "S1", category: "SUB JUNIOR", team: "RIFADAH", password: "688", driveId: "" },
  { chestNo: "689", name: "MUHAMMED SHAKIR M", class: "S1", category: "SUB JUNIOR", team: "QIYADAH", password: "689", driveId: "" },
  { chestNo: "690", name: "MUHAMMED RAYYAN MK", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "690", driveId: "" },
  { chestNo: "691", name: "MUHAMMED MINSHAD. K", class: "S1", category: "SUB JUNIOR", team: "SIYADAH", password: "691", driveId: "" },
  { chestNo: "692", name: "MUHAMMED AYAN.T", class: "S1", category: "SUB JUNIOR", team: "WIFADAH", password: "692", driveId: "" },
  { chestNo: "633", name: "ASHMIL M", class: "S1", category: "SUB JUNIOR", team: "QIYADAH", password: "633", driveId: "" },
  { chestNo: "648", name: "UMER HAISAM P", class: "S1", category: "SUB JUNIOR", team: "RIFADAH", password: "648", driveId: "" },
  { chestNo: "636", name: "NAJI ALI.CP", class: "S1", category: "SUB JUNIOR", team: "WIFADAH", password: "636", driveId: "" },

  { chestNo: "623", name: "MUHAMMAD SUHAIL K", class: "S2", category: "SUB JUNIOR", team: "RIFADAH", password: "623", driveId: "" },
  { chestNo: "631", name: "MUHAMMAD RAYYAN T", class: "S2", category: "SUB JUNIOR", team: "WIFADAH", password: "631", driveId: "" },
  { chestNo: "622", name: "SYED ABDULLAH KADRI", class: "S2", category: "SUB JUNIOR", team: "SIYADAH", password: "622", driveId: "" },
  { chestNo: "626", name: "MUHAMMED NAFIH A", class: "S2", category: "SUB JUNIOR", team: "WIFADAH", password: "626", driveId: "" },
  { chestNo: "627", name: "MUHAMMED ADNAN K", class: "S2", category: "SUB JUNIOR", team: "RIFADAH", password: "627", driveId: "" },
  { chestNo: "632", name: "MUHAMMAD NIHAL P", class: "S2", category: "SUB JUNIOR", team: "QIYADAH", password: "632", driveId: "" },
  { chestNo: "635", name: "MOHAMMED SHAMMAS", class: "S2", category: "SUB JUNIOR", team: "QIYADAH", password: "635", driveId: "" },
  { chestNo: "645", name: "MUHAMMED NAJIL KV", class: "S2", category: "SUB JUNIOR", team: "SIYADAH", password: "645", driveId: "" },
  { chestNo: "625", name: "MUHAMMED RAZEEN P.T", class: "S2", category: "SUB JUNIOR", team: "WIFADAH", password: "625", driveId: "" },
  { chestNo: "621", name: "MUHAMMED SAHAL P", class: "S2", category: "SUB JUNIOR", team: "SIYADAH", password: "621", driveId: "" },
  { chestNo: "597", name: "SHAMMAS P", class: "S2", category: "SUB JUNIOR", team: "WIFADAH", password: "597", driveId: "" },
  { chestNo: "609", name: "MUHAMMED ARIF M", class: "S2", category: "SUB JUNIOR", team: "QIYADAH", password: "609", driveId: "" },
  { chestNo: "637", name: "MUHAMMED MABROOQ P", class: "S2", category: "SUB JUNIOR", team: "RIFADAH", password: "637", driveId: "" },
  { chestNo: "642", name: "SHIFAZ AYMAN", class: "S2", category: "SUB JUNIOR", team: "SIYADAH", password: "642", driveId: "" },
  { chestNo: "638", name: "ABDUL ADEEB M", class: "S2", category: "SUB JUNIOR", team: "WIFADAH", password: "638", driveId: "" },
  { chestNo: "624", name: "ABDULLAH. A", class: "S2", category: "SUB JUNIOR", team: "SIYADAH", password: "624", driveId: "" },
  { chestNo: "600", name: "MUHAMMED HISHAM P.K", class: "S2", category: "SUB JUNIOR", team: "WIFADAH", password: "600", driveId: "" },
  { chestNo: "650", name: "DANISH AHMAD K M", class: "S2", category: "SUB JUNIOR", team: "QIYADAH", password: "650", driveId: "" },
  { chestNo: "634", name: "MOHAMMED SHAHEEM", class: "S2", category: "SUB JUNIOR", team: "SIYADAH", password: "634", driveId: "" },
  { chestNo: "643", name: "MISHAL MUHSIN C", class: "S2", category: "SUB JUNIOR", team: "SIYADAH", password: "643", driveId: "" },
  { chestNo: "646", name: "RIFIN P", class: "S2", category: "SUB JUNIOR", team: "RIFADAH", password: "646", driveId: "" },
  { chestNo: "644", name: "MUHAMMED RABEEH C", class: "S2", category: "SUB JUNIOR", team: "WIFADAH", password: "644", driveId: "" },
  { chestNo: "611", name: "ANSHIF MUHAMMED P", class: "S2", category: "SUB JUNIOR", team: "RIFADAH", password: "611", driveId: "" },
  { chestNo: "606", name: "MUHAMMED MUHSIN M", class: "S2", category: "SUB JUNIOR", team: "RIFADAH", password: "606", driveId: "" },
  { chestNo: "596", name: "MUHAMMED HISHAM KT", class: "S2", category: "SUB JUNIOR", team: "RIFADAH", password: "596", driveId: "" },
  { chestNo: "652", name: "MUEEN ALI", class: "S2", category: "SUB JUNIOR", team: "QIYADAH", password: "652", driveId: "" },
  { chestNo: "657", name: "MUHAMMED AJMAL MK", class: "S2", category: "SUB JUNIOR", team: "QIYADAH", password: "657", driveId: "" },
  { chestNo: "658", name: "AZMIL SHAN", class: "S2", category: "SUB JUNIOR", team: "QIYADAH", password: "658", driveId: "" },

  // JUNIOR (S3 & S4)
  { chestNo: "586", name: "MUHINUDHEEN.P.K", class: "S3", category: "JUNIOR", team: "QIYADAH", password: "586", driveId: "" },
  { chestNo: "605", name: "AHAMMED HANAN M", class: "S3", category: "JUNIOR", team: "WIFADAH", password: "605", driveId: "" },
  { chestNo: "612", name: "MOHAMMED SHAJAH M.", class: "S3", category: "JUNIOR", team: "RIFADAH", password: "612", driveId: "" },
  { chestNo: "603", name: "MUHAMMED RADHIN P", class: "S3", category: "JUNIOR", team: "RIFADAH", password: "603", driveId: "" },
  { chestNo: "613", name: "MOHAMMAD FASEEH .KT", class: "S3", category: "JUNIOR", team: "RIFADAH", password: "613", driveId: "" },
  { chestNo: "610", name: "MUHAMMED SHAREEF M", class: "S3", category: "JUNIOR", team: "RIFADAH", password: "610", driveId: "" },
  { chestNo: "608", name: "MUHAMMED SHANID.T", class: "S3", category: "JUNIOR", team: "QIYADAH", password: "608", driveId: "" },
  { chestNo: "585", name: "MUHAMMAD MUHSIN", class: "S3", category: "JUNIOR", team: "SIYADAH", password: "585", driveId: "" },
  { chestNo: "588", name: "MOHAMMED ZAYAN V", class: "S3", category: "JUNIOR", team: "WIFADAH", password: "588", driveId: "" },
  { chestNo: "595", name: "MUHAMMED AMEEN M", class: "S3", category: "JUNIOR", team: "WIFADAH", password: "595", driveId: "" },
  { chestNo: "592", name: "HADI ASLAM. NK", class: "S3", category: "JUNIOR", team: "SIYADAH", password: "592", driveId: "" },
  { chestNo: "589", name: "MUHAMMED SAFVAN AP", class: "S3", category: "JUNIOR", team: "QIYADAH", password: "589", driveId: "" },
  { chestNo: "587", name: "MUHAMMED MUSTHAFA FAVAS", class: "S3", category: "JUNIOR", team: "QIYADAH", password: "587", driveId: "" },
  { chestNo: "599", name: "AMEEN BASIL", class: "S3", category: "JUNIOR", team: "RIFADAH", password: "599", driveId: "" },
  { chestNo: "575", name: "JAMSHEER ALI", class: "S3", category: "JUNIOR", team: "WIFADAH", password: "575", driveId: "" },
  { chestNo: "594", name: "MUHAMMED ADNAN K T", class: "S3", category: "JUNIOR", team: "QIYADAH", password: "594", driveId: "" },
  { chestNo: "591", name: "SHADHI MOHAMED J", class: "S3", category: "JUNIOR", team: "SIYADAH", password: "591", driveId: "" },
  { chestNo: "574", name: "SAYYED MUHAMMED REZIN", class: "S3", category: "JUNIOR", team: "SIYADAH", password: "574", driveId: "" },
  { chestNo: "552", name: "MUHAMMED ADHIL VP", class: "S3", category: "JUNIOR", team: "QIYADAH", password: "552", driveId: "" },
  { chestNo: "569", name: "ABDU RAHIMAN MA", class: "S3", category: "JUNIOR", team: "WIFADAH", password: "569", driveId: "" },
  { chestNo: "659", name: "MUHAMMED NIHAL TP", class: "S3", category: "JUNIOR", team: "RIFADAH", password: "659", driveId: "" },
  { chestNo: "660", name: "MUHAMMED MUHSIN MK", class: "S3", category: "JUNIOR", team: "SIYADAH", password: "660", driveId: "" },
  { chestNo: "662", name: "MUHAMMED RAYYAN PA", class: "S3", category: "JUNIOR", team: "SIYADAH", password: "662", driveId: "" },
  { chestNo: "693", name: "MUHAMMED MUSHFIQ P", class: "S3", category: "JUNIOR", team: "WIFADAH", password: "693", driveId: "" },
  { chestNo: "696", name: "MUHAMMED SABITH M", class: "S3", category: "JUNIOR", team: "WIFADAH", password: "696", driveId: "" },

  { chestNo: "540", name: "MUSTHAFA MIDLAJ AP", class: "S4", category: "JUNIOR", team: "QIYADAH", password: "540", driveId: "" },
  { chestNo: "542", name: "PP MUHAMMED MIDHLAJ", class: "S4", category: "JUNIOR", team: "WIFADAH", password: "542", driveId: "" },
  { chestNo: "550", name: "NISHAL MUHAMMED P T", class: "S4", category: "JUNIOR", team: "SIYADAH", password: "550", driveId: "" },
  { chestNo: "560", name: "ADNAN T.P", class: "S4", category: "JUNIOR", team: "SIYADAH", password: "560", driveId: "" },
  { chestNo: "548", name: "MUHAMMED MK", class: "S4", category: "JUNIOR", team: "RIFADAH", password: "548", driveId: "" },
  { chestNo: "566", name: "MUHAMMED SHANEEB KM", class: "S4", category: "JUNIOR", team: "WIFADAH", password: "566", driveId: "" },
  { chestNo: "545", name: "MOHAMMED RIZAN", class: "S4", category: "JUNIOR", team: "QIYADAH", password: "545", driveId: "" },
  { chestNo: "568", name: "MUHAMMED HISHAM M", class: "S4", category: "JUNIOR", team: "RIFADAH", password: "568", driveId: "" },
  { chestNo: "549", name: "MUHAMMED SALMAN K", class: "S4", category: "JUNIOR", team: "WIFADAH", password: "549", driveId: "" },
  { chestNo: "571", name: "MUHAMMED ANSHID K", class: "S4", category: "JUNIOR", team: "QIYADAH", password: "571", driveId: "" },
  { chestNo: "559", name: "MUHAMMED SHAKIR P", class: "S4", category: "JUNIOR", team: "QIYADAH", password: "559", driveId: "" },
  { chestNo: "564", name: "ASHIQ RIZVAN C", class: "S4", category: "JUNIOR", team: "QIYADAH", password: "564", driveId: "" },
  { chestNo: "539", name: "FAYAZUDHEEN", class: "S4", category: "JUNIOR", team: "SIYADAH", password: "539", driveId: "" },
  { chestNo: "573", name: "MOHAMMED ASMIL. KM", class: "S4", category: "JUNIOR", team: "SIYADAH", password: "573", driveId: "" },
  { chestNo: "541", name: "MUNAVVAR ALI. P", class: "S4", category: "JUNIOR", team: "SIYADAH", password: "541", driveId: "" },
  { chestNo: "555", name: "SHAFIN P", class: "S4", category: "JUNIOR", team: "SIYADAH", password: "555", driveId: "" },
  { chestNo: "558", name: "MUHAMMED SHAMIL. K", class: "S4", category: "JUNIOR", team: "WIFADAH", password: "558", driveId: "" },
  { chestNo: "547", name: "MUHAMMED FASEEH P", class: "S4", category: "JUNIOR", team: "RIFADAH", password: "547", driveId: "" },
  { chestNo: "553", name: "MOHAMMED FARHAN .K", class: "S4", category: "JUNIOR", team: "RIFADAH", password: "553", driveId: "" },
  { chestNo: "543", name: "IBRAHIM BADUSHAH", class: "S4", category: "JUNIOR", team: "QIYADAH", password: "543", driveId: "" },
  { chestNo: "577", name: "MUHAMMED FARHAN. C", class: "S4", category: "JUNIOR", team: "SIYADAH", password: "577", driveId: "" },
  { chestNo: "505", name: "MUHAMMED ZAYYAN K", class: "S4", category: "JUNIOR", team: "QIYADAH", password: "505", driveId: "" },
  { chestNo: "526", name: "MUAHMMED JINAS M", class: "S4", category: "JUNIOR", team: "WIFADAH", password: "526", driveId: "" },
  { chestNo: "527", name: "MOHAMMED ANSHIF", class: "S4", category: "JUNIOR", team: "QIYADAH", password: "527", driveId: "" },
  { chestNo: "551", name: "MUHAMMED HANOON P P", class: "S4", category: "JUNIOR", team: "RIFADAH", password: "551", driveId: "" },
  { chestNo: "563", name: "MOHAMMED AMAN", class: "S4", category: "JUNIOR", team: "SIYADAH", password: "563", driveId: "" },
  { chestNo: "546", name: "MUHAMMED MUFAID.P", class: "S4", category: "JUNIOR", team: "RIFADAH", password: "546", driveId: "" },
  { chestNo: "556", name: "MOHAMMED SIYADH", class: "S4", category: "JUNIOR", team: "WIFADAH", password: "556", driveId: "" },
  { chestNo: "529", name: "MUHAMMED HASHIR P", class: "S4", category: "JUNIOR", team: "RIFADAH", password: "529", driveId: "" },
  { chestNo: "651", name: "MUHAMMED ANVIN", class: "S4", category: "JUNIOR", team: "WIFADAH", password: "651", driveId: "" },
  { chestNo: "661", name: "MUHAMMED SHADHIL TT", class: "S4", category: "JUNIOR", team: "WIFADAH", password: "661", driveId: "" },

  // SENIOR (S5 & SS1 / SS2)
  { chestNo: "506", name: "MOHAMMED SALIH", class: "S5", category: "SENIOR", team: "QIYADAH", password: "506", driveId: "" },
  { chestNo: "510", name: "ABRAR V", class: "S5", category: "SENIOR", team: "WIFADAH", password: "510", driveId: "" },
  { chestNo: "502", name: "ADHIL ALI P", class: "S5", category: "SENIOR", team: "WIFADAH", password: "502", driveId: "" },
  { chestNo: "531", name: "MUHAMMED SHAMEEL MK", class: "S5", category: "SENIOR", team: "SIYADAH", password: "531", driveId: "" },
  { chestNo: "515", name: "SHAMIL CM", class: "S5", category: "SENIOR", team: "RIFADAH", password: "515", driveId: "" },
  { chestNo: "492", name: "MOHAMMED KOLLAPARAMBAN", class: "S5", category: "SENIOR", team: "WIFADAH", password: "492", driveId: "" },
  { chestNo: "496", name: "SINWAN K", class: "S5", category: "SENIOR", team: "RIFADAH", password: "496", driveId: "" },
  { chestNo: "499", name: "MUHAMMED SITHAN", class: "S5", category: "SENIOR", team: "SIYADAH", password: "499", driveId: "" },
  { chestNo: "509", name: "MUHAMMED ADIL", class: "S5", category: "SENIOR", team: "SIYADAH", password: "509", driveId: "" },
  { chestNo: "504", name: "MUHAMMED MINHAJ VK", class: "S5", category: "SENIOR", team: "RIFADAH", password: "504", driveId: "" },
  { chestNo: "524", name: "MUHAMMED NAFIH. AK", class: "S5", category: "SENIOR", team: "WIFADAH", password: "524", driveId: "" },
  { chestNo: "495", name: "MUHAMMED SHAFI V", class: "S5", category: "SENIOR", team: "SIYADAH", password: "495", driveId: "" },
  { chestNo: "516", name: "MOHAMMED SHAN P", class: "S5", category: "SENIOR", team: "RIFADAH", password: "516", driveId: "" },
  { chestNo: "518", name: "MUHAMMED NAEEM KP", class: "S5", category: "SENIOR", team: "SIYADAH", password: "518", driveId: "" },
  { chestNo: "530", name: "MUHAMMED RAJIL K", class: "S5", category: "SENIOR", team: "WIFADAH", password: "530", driveId: "" },
  { chestNo: "498", name: "MUHAMMED RAZIN. KP", class: "S5", category: "SENIOR", team: "QIYADAH", password: "498", driveId: "" },
  { chestNo: "493", name: "MINHAJ K", class: "S5", category: "SENIOR", team: "QIYADAH", password: "493", driveId: "" },
  { chestNo: "517", name: "ADIL AHAMMED P.V", class: "S5", category: "SENIOR", team: "SIYADAH", password: "517", driveId: "" },
  { chestNo: "497", name: "ABDULLA ASIM.M.K", class: "S5", category: "SENIOR", team: "RIFADAH", password: "497", driveId: "" },
  { chestNo: "508", name: "MUAAD ALI P", class: "S5", category: "SENIOR", team: "SIYADAH", password: "508", driveId: "" },
  { chestNo: "467", name: "SHIFIN MUHAMMED K.V.M", class: "S5", category: "SENIOR", team: "QIYADAH", password: "467", driveId: "" },
  { chestNo: "523", name: "MUHAMMED ATAU RAHMAN T", class: "S5", category: "SENIOR", team: "QIYADAH", password: "523", driveId: "" },
  { chestNo: "501", name: "MUHAMMED ASIM CK", class: "S5", category: "SENIOR", team: "QIYADAH", password: "501", driveId: "" },
  { chestNo: "522", name: "MOHAMMED MISHAL A", class: "S5", category: "SENIOR", team: "RIFADAH", password: "522", driveId: "" },
  { chestNo: "511", name: "MIRSHAD OK", class: "S5", category: "SENIOR", team: "RIFADAH", password: "511", driveId: "" },
  { chestNo: "528", name: "ABRAR ELLATH", class: "S5", category: "SENIOR", team: "WIFADAH", password: "528", driveId: "" },
  { chestNo: "503", name: "MOHAMMED NABHAN T K", class: "S5", category: "SENIOR", team: "RIFADAH", password: "503", driveId: "" },
  { chestNo: "521", name: "ABDULLA SAJID", class: "S5", category: "SENIOR", team: "QIYADAH", password: "521", driveId: "" },
  { chestNo: "519", name: "SAYYID ALAVI K", class: "S5", category: "SENIOR", team: "SIYADAH", password: "519", driveId: "" },
  { chestNo: "513", name: "HADIN K", class: "S5", category: "SENIOR", team: "WIFADAH", password: "513", driveId: "" },
  { chestNo: "479", name: "MUHAMMED SABITH M", class: "S5", category: "SENIOR", team: "WIFADAH", password: "479", driveId: "" },
  { chestNo: "456", name: "MUHAMMED SHAMEEM PV", class: "S5", category: "SENIOR", team: "QIYADAH", password: "456", driveId: "" },

  { chestNo: "454", name: "MUHAMMED RAHEES T", class: "SS1", category: "SENIOR", team: "SIYADAH", password: "454", driveId: "" },
  { chestNo: "483", name: "MUHAMMED SWALIH. P", class: "SS1", category: "SENIOR", team: "QIYADAH", password: "483", driveId: "" },
  { chestNo: "459", name: "MUHAMMED RISAL AMEEN", class: "SS1", category: "SENIOR", team: "RIFADAH", password: "459", driveId: "" },
  { chestNo: "473", name: "MUHAMMED SHAMIL KP", class: "SS1", category: "SENIOR", team: "QIYADAH", password: "473", driveId: "" },
  { chestNo: "418", name: "SHAMIL.K", class: "SS1", category: "SENIOR", team: "SIYADAH", password: "418", driveId: "" },
  { chestNo: "465", name: "MUHAMMED MUNAVVIR", class: "SS1", category: "SENIOR", team: "RIFADAH", password: "465", driveId: "" },
  { chestNo: "472", name: "MUHAMMED JASIM", class: "SS1", category: "SENIOR", team: "SIYADAH", password: "472", driveId: "" },
  { chestNo: "464", name: "MAHMOOD RILVAN", class: "SS1", category: "SENIOR", team: "WIFADAH", password: "464", driveId: "" },
  { chestNo: "458", name: "MUHAMMED SWALIH", class: "SS1", category: "SENIOR", team: "QIYADAH", password: "458", driveId: "" },
  { chestNo: "462", name: "MUHAMMED SABITH.K", class: "SS1", category: "SENIOR", team: "RIFADAH", password: "462", driveId: "" },
  { chestNo: "475", name: "ZIYAD RAHMAN V", class: "SS1", category: "SENIOR", team: "QIYADAH", password: "475", driveId: "" },
  { chestNo: "469", name: "MUHAMMED ADHIL", class: "SS1", category: "SENIOR", team: "SIYADAH", password: "469", driveId: "" },
  { chestNo: "468", name: "SAYYED MUHAMMED SHAMEEL.A.P", class: "SS1", category: "SENIOR", team: "RIFADAH", password: "468", driveId: "" },
  { chestNo: "455", name: "MUHAMMED WAJEEH MK", class: "SS1", category: "SENIOR", team: "WIFADAH", password: "455", driveId: "" },
  { chestNo: "457", name: "MUHAMMED HISHAM A", class: "SS1", category: "SENIOR", team: "WIFADAH", password: "457", driveId: "" },
  { chestNo: "422", name: "MUHAMMED FAHEEM K T", class: "SS1", category: "SENIOR", team: "WIFADAH", password: "422", driveId: "" },
  { chestNo: "474", name: "MOHAMED SHAHEEM E K", class: "SS1", category: "SENIOR", team: "RIFADAH", password: "474", driveId: "" },

  { chestNo: "417", name: "ABDUL RASHAD MK", class: "SS2", category: "SENIOR", team: "SIYADAH", password: "417", driveId: "" },
  { chestNo: "419", name: "HADI MOHAMMED T", class: "SS2", category: "SENIOR", team: "WIFADAH", password: "419", driveId: "" },
  { chestNo: "446", name: "ANSAR K", class: "SS2", category: "SENIOR", team: "QIYADAH", password: "446", driveId: "" },
  { chestNo: "424", name: "MUHAMMED FARWA P P", class: "SS2", category: "SENIOR", team: "WIFADAH", password: "424", driveId: "" },
  { chestNo: "421", name: "SIRAJUDHEEN.N", class: "SS2", category: "SENIOR", team: "RIFADAH", password: "421", driveId: "" },
  { chestNo: "414", name: "MUHAMMED SHADIL VK", class: "SS2", category: "SENIOR", team: "RIFADAH", password: "414", driveId: "" },
  { chestNo: "403", name: "MUHAMMED SAHAL C", class: "SS2", category: "SENIOR", team: "QIYADAH", password: "403", driveId: "" },
  { chestNo: "437", name: "MOHAMMED BAJEEL M", class: "SS2", category: "SENIOR", team: "RIFADAH", password: "437", driveId: "" },
  { chestNo: "439", name: "MUHAMMED ADHNAN VP", class: "SS2", category: "SENIOR", team: "SIYADAH", password: "439", driveId: "" },
  { chestNo: "425", name: "MOHAMMED MIRSHAD C", class: "SS2", category: "SENIOR", team: "RIFADAH", password: "425", driveId: "" },
  { chestNo: "396", name: "SAYYID MUHAMMED HANEEFA VT", class: "SS2", category: "SENIOR", team: "WIFADAH", password: "396", driveId: "" },
  { chestNo: "416", name: "ABDULLA SALIM K P", class: "SS2", category: "SENIOR", team: "WIFADAH", password: "416", driveId: "" },
  { chestNo: "441", name: "FAISAL SABITH CH", class: "SS2", category: "SENIOR", team: "SIYADAH", password: "441", driveId: "" },
  { chestNo: "420", name: "MOHAMMED KASIM K", class: "SS2", category: "SENIOR", team: "RIFADAH", password: "420", driveId: "" },
  { chestNo: "431", name: "MUHAMMED JALAL.A", class: "SS2", category: "SENIOR", team: "SIYADAH", password: "431", driveId: "" },
  { chestNo: "443", name: "MUHAMMED SINAN P", class: "SS2", category: "SENIOR", team: "QIYADAH", password: "443", driveId: "" },
  { chestNo: "423", name: "MUHAMMAD ANSAH A T", class: "SS2", category: "SENIOR", team: "WIFADAH", password: "423", driveId: "" },
  { chestNo: "444", name: "MUHAMMAD FALAH", class: "SS2", category: "SENIOR", team: "QIYADAH", password: "444", driveId: "" },
  { chestNo: "440", name: "JUSAIRUDHEEN", class: "SS2", category: "SENIOR", team: "QIYADAH", password: "440", driveId: "" },
  { chestNo: "386", name: "MUHAMMED ANSIL P", class: "SS2", category: "SENIOR", team: "QIYADAH", password: "386", driveId: "" },
  { chestNo: "448", name: "DHANISH C", class: "SS2", category: "SENIOR", team: "WIFADAH", password: "448", driveId: "" },
  { chestNo: "394", name: "MUHAMMED SWADIQ", class: "SS2", category: "SENIOR", team: "SIYADAH", password: "394", driveId: "" },
  { chestNo: "405", name: "MUHAMMED SHAHEEM P K", class: "SS2", category: "SENIOR", team: "RIFADAH", password: "405", driveId: "" },

  // SUPER SENIOR (D1, D2, D3)
  { chestNo: "344", name: "ABOOBACKER SIDDIQUE A M", class: "D1", category: "SUPER SENIOR", team: "QIYADAH", password: "344", driveId: "" },
  { chestNo: "384", name: "MOHAMMED RAZI K", class: "D1", category: "SUPER SENIOR", team: "SIYADAH", password: "384", driveId: "" },
  { chestNo: "393", name: "SAHLUDHEEN P.K", class: "D1", category: "SUPER SENIOR", team: "SIYADAH", password: "393", driveId: "" },
  { chestNo: "319", name: "MUBASHIR K", class: "D1", category: "SUPER SENIOR", team: "QIYADAH", password: "319", driveId: "" },
  { chestNo: "399", name: "MUHAMMAD SHAMMAS.P", class: "D1", category: "SUPER SENIOR", team: "RIFADAH", password: "399", driveId: "" },
  { chestNo: "406", name: "ABDULLA RAJIH M K", class: "D1", category: "SUPER SENIOR", team: "QIYADAH", password: "406", driveId: "" },
  { chestNo: "408", name: "AMAN MUHAMMED P", class: "D1", category: "SUPER SENIOR", team: "QIYADAH", password: "408", driveId: "" },
  { chestNo: "401", name: "SAYYID MUHAMMED NIHAD O M", class: "D1", category: "SUPER SENIOR", team: "WIFADAH", password: "401", driveId: "" },
  { chestNo: "389", name: "MUHAMMED SHAMIL KK", class: "D1", category: "SUPER SENIOR", team: "SIYADAH", password: "389", driveId: "" },
  { chestNo: "656", name: "MUHAMMED THULAIB K", class: "D1", category: "SUPER SENIOR", team: "SIYADAH", password: "656", driveId: "" },
  { chestNo: "381", name: "DHILSHAD ROSHAN N", class: "D1", category: "SUPER SENIOR", team: "WIFADAH", password: "381", driveId: "" },
  { chestNo: "410", name: "MUHAMMED JASEEL KK", class: "D1", category: "SUPER SENIOR", team: "RIFADAH", password: "410", driveId: "" },
  { chestNo: "654", name: "MUHAMMED MINHAJ K", class: "D1", category: "SUPER SENIOR", team: "RIFADAH", password: "654", driveId: "" },
  { chestNo: "383", name: "JIFINSHAN V P", class: "D1", category: "SUPER SENIOR", team: "SIYADAH", password: "383", driveId: "" },
  { chestNo: "385", name: "MUHAMMED SHAMIL M", class: "D1", category: "SUPER SENIOR", team: "QIYADAH", password: "385", driveId: "" },
  { chestNo: "375", name: "MUHAMMED SUFIYAN M K", class: "D1", category: "SUPER SENIOR", team: "WIFADAH", password: "375", driveId: "" },
  { chestNo: "655", name: "MOHAMMED SHAMIL ET", class: "D1", category: "SUPER SENIOR", team: "WIFADAH", password: "655", driveId: "" },
  { chestNo: "413", name: "ASHMIL T P", class: "D1", category: "SUPER SENIOR", team: "WIFADAH", password: "413", driveId: "" },
  { chestNo: "653", name: "MOHAMMED SHIBAN TT", class: "D1", category: "SUPER SENIOR", team: "SIYADAH", password: "653", driveId: "" },
  { chestNo: "404", name: "MOHAMMED THANSHIF P", class: "D1", category: "SUPER SENIOR", team: "WIFADAH", password: "404", driveId: "" },
  { chestNo: "354", name: "MUHAMMED RAFI U", class: "D1", category: "SUPER SENIOR", team: "RIFADAH", password: "354", driveId: "" },
  { chestNo: "326", name: "MUHAMMED SINAN KV", class: "D1", category: "SUPER SENIOR", team: "RIFADAH", password: "326", driveId: "" },
  { chestNo: "412", name: "MOHAMMED ASLAM KT", class: "D1", category: "SUPER SENIOR", team: "WIFADAH", password: "412", driveId: "" },
  { chestNo: "350", name: "MUHAMMED AMEEN K", class: "D1", category: "SUPER SENIOR", team: "RIFADAH", password: "350", driveId: "" },
  { chestNo: "694", name: "ABDULLA HISHAM PT", class: "D1", category: "SUPER SENIOR", team: "QIYADAH", password: "694", driveId: "" },
  { chestNo: "363", name: "MUHAMMED MINHAJ C K", class: "D1", category: "SUPER SENIOR", team: "SIYADAH", password: "363", driveId: "" },
  { chestNo: "397", name: "BUSHAIR NK", class: "D1", category: "SUPER SENIOR", team: "WIFADAH", password: "397", driveId: "" },

  { chestNo: "616", name: "MUHAMMED SINAN K", class: "D2", category: "SUPER SENIOR", team: "QIYADAH", password: "616", driveId: "" },
  { chestNo: "343", name: "MUHAMMED NAJIL KK", class: "D2", category: "SUPER SENIOR", team: "SIYADAH", password: "343", driveId: "" },
  { chestNo: "357", name: "MUHAMMED SINAN M", class: "D2", category: "SUPER SENIOR", team: "RIFADAH", password: "357", driveId: "" },
  { chestNo: "334", name: "MUHAMMED ADIL P", class: "D2", category: "SUPER SENIOR", team: "SIYADAH", password: "334", driveId: "" },
  { chestNo: "333", name: "ASHIF PP", class: "D2", category: "SUPER SENIOR", team: "WIFADAH", password: "333", driveId: "" },
  { chestNo: "372", name: "ASHIQ A K", class: "D2", category: "SUPER SENIOR", team: "SIYADAH", password: "372", driveId: "" },
  { chestNo: "371", name: "MUHAMMED FAHAD K P", class: "D2", category: "SUPER SENIOR", team: "SIYADAH", password: "371", driveId: "" },
  { chestNo: "338", name: "MUHAMMED NISHAD K", class: "D2", category: "SUPER SENIOR", team: "WIFADAH", password: "338", driveId: "" },
  { chestNo: "373", name: "MUHAMMED SUFYAN V", class: "D2", category: "SUPER SENIOR", team: "RIFADAH", password: "373", driveId: "" },
  { chestNo: "364", name: "MUHAMMED SHAMIL A", class: "D2", category: "SUPER SENIOR", team: "QIYADAH", password: "364", driveId: "" },
  { chestNo: "317", name: "MUHAMMED FIYAZ C", class: "D2", category: "SUPER SENIOR", team: "WIFADAH", password: "317", driveId: "" },
  { chestNo: "330", name: "ABDULLA JASAR KM", class: "D2", category: "SUPER SENIOR", team: "WIFADAH", password: "330", driveId: "" },
  { chestNo: "369", name: "MUHAMMED MIDLAJ K", class: "D2", category: "SUPER SENIOR", team: "SIYADAH", password: "369", driveId: "" },
  { chestNo: "331", name: "MOHAMMED RAZI K", class: "D2", category: "SUPER SENIOR", team: "RIFADAH", password: "331", driveId: "" },
  { chestNo: "352", name: "MUHAMMED ADIL P", class: "D2", category: "SUPER SENIOR", team: "QIYADAH", password: "352", driveId: "" },
  { chestNo: "339", name: "SHADHIN T", class: "D2", category: "SUPER SENIOR", team: "RIFADAH", password: "339", driveId: "" },
  { chestNo: "374", name: "SHAHEEM SAYYID K K", class: "D2", category: "SUPER SENIOR", team: "QIYADAH", password: "374", driveId: "" },
  { chestNo: "367", name: "MUHAMMED AMEEN K", class: "D2", category: "SUPER SENIOR", team: "SIYADAH", password: "367", driveId: "" },
  { chestNo: "335", name: "SHIBIL SHAD K", class: "D2", category: "SUPER SENIOR", team: "RIFADAH", password: "335", driveId: "" },
  { chestNo: "337", name: "ABDUL BASITH KT", class: "D2", category: "SUPER SENIOR", team: "RIFADAH", password: "337", driveId: "" },
  { chestNo: "353", name: "ANSHIF K", class: "D2", category: "SUPER SENIOR", team: "WIFADAH", password: "353", driveId: "" },
  { chestNo: "308", name: "MUHAMMED RIHAN MT", class: "D2", category: "SUPER SENIOR", team: "WIFADAH", password: "308", driveId: "" },
  { chestNo: "346", name: "MUHAMMED SINAN M", class: "D2", category: "SUPER SENIOR", team: "QIYADAH", password: "346", driveId: "" },
  { chestNo: "342", name: "AHMED A", class: "D2", category: "SUPER SENIOR", team: "QIYADAH", password: "342", driveId: "" },
  { chestNo: "302", name: "MOHAMMED SANEEN K", class: "D2", category: "SUPER SENIOR", team: "RIFADAH", password: "302", driveId: "" },
  { chestNo: "618", name: "ZUMARAD C", class: "D2", category: "SUPER SENIOR", team: "RIFADAH", password: "618", driveId: "" },
  { chestNo: "329", name: "MUHAMMED RISWAN MP", class: "D2", category: "SUPER SENIOR", team: "SIYADAH", password: "329", driveId: "" },

  { chestNo: "312", name: "MUHAMMED DILSHAD K", class: "D3", category: "SUPER SENIOR", team: "QIYADAH", password: "312", driveId: "" },
  { chestNo: "318", name: "MUHAMMED ANZIL P", class: "D3", category: "SUPER SENIOR", team: "RIFADAH", password: "318", driveId: "" },
  { chestNo: "303", name: "MOHAMMED SHUHAIB K", class: "D3", category: "SUPER SENIOR", team: "WIFADAH", password: "303", driveId: "" },
  { chestNo: "311", name: "MUHAMMED RISHAD PT", class: "D3", category: "SUPER SENIOR", team: "WIFADAH", password: "311", driveId: "" },
  { chestNo: "583", name: "MUHAMMED SHANIF", class: "D3", category: "SUPER SENIOR", team: "SIYADAH", password: "583", driveId: "" },
  { chestNo: "313", name: "ABDULLA SALIH KP", class: "D3", category: "SUPER SENIOR", team: "QIYADAH", password: "313", driveId: "" },
  { chestNo: "307", name: "ABDUL BASITH KK", class: "D3", category: "SUPER SENIOR", team: "WIFADAH", password: "307", driveId: "" },
  { chestNo: "323", name: "HUSAIN KK", class: "D3", category: "SUPER SENIOR", team: "RIFADAH", password: "323", driveId: "" },
  { chestNo: "581", name: "MUHAMMED AHSAN V P", class: "D3", category: "SUPER SENIOR", team: "QIYADAH", password: "581", driveId: "" },
  { chestNo: "305", name: "MOHAMMED SAFWAN V", class: "D3", category: "SUPER SENIOR", team: "SIYADAH", password: "305", driveId: "" },
  { chestNo: "584", name: "MUHAMMED MURSHID A", class: "D3", category: "SUPER SENIOR", team: "RIFADAH", password: "584", driveId: "" },
  { chestNo: "281", name: "MUHAMMED RAJEEL N", class: "D3", category: "SUPER SENIOR", team: "SIYADAH", password: "281", driveId: "" },
  { chestNo: "580", name: "MUHAMMED SAFWAN P P", class: "D3", category: "SUPER SENIOR", team: "WIFADAH", password: "580", driveId: "" },
  { chestNo: "268", name: "FAYYAZ N", class: "D3", category: "SUPER SENIOR", team: "RIFADAH", password: "268", driveId: "" },
  { chestNo: "579", name: "MUHAMMED AFSAL. KK", class: "D3", category: "SUPER SENIOR", team: "WIFADAH", password: "579", driveId: "" },
  { chestNo: "314", name: "MOHAMMED FADHIL P", class: "D3", category: "SUPER SENIOR", team: "SIYADAH", password: "314", driveId: "" },
  { chestNo: "315", name: "MOHAMMED MUSTHAFA C", class: "D3", category: "SUPER SENIOR", team: "QIYADAH", password: "315", driveId: "" },
  { chestNo: "293", name: "MOHAMMED BINSHAD N M", class: "D3", category: "SUPER SENIOR", team: "QIYADAH", password: "293", driveId: "" },
  { chestNo: "262", name: "MUHAMMAD HABEEB P", class: "D3", category: "SUPER SENIOR", team: "SIYADAH", password: "262", driveId: "" },
  { chestNo: "325", name: "SINAN AHMED P", class: "D3", category: "SUPER SENIOR", team: "RIFADAH", password: "325", driveId: "" },
  { chestNo: "279", name: "ASLAH TT", class: "D3", category: "SUPER SENIOR", team: "SIYADAH", password: "279", driveId: "" },
  { chestNo: "327", name: "SHAMIL PK", class: "D3", category: "SUPER SENIOR", team: "QIYADAH", password: "327", driveId: "" },
  { chestNo: "582", name: "MUHAMMED LABEEB O", class: "D3", category: "SUPER SENIOR", team: "QIYADAH", password: "582", driveId: "" }
];

const DEFAULT_PROGRAM_LIST = [
  // A1: Qur'an Talent
  { code: "A1", program: "Qur'an Talent", section: "SUPER SENIOR", type: "Individual", chestNo: "311", name: "MUHAMMED RISHAD PT", team: "WIFADAH" },
  { code: "A1", program: "Qur'an Talent", section: "SUPER SENIOR", type: "Individual", chestNo: "353", name: "ANSHIF K", team: "WIFADAH" },
  { code: "A1", program: "Qur'an Talent", section: "SUPER SENIOR", type: "Individual", chestNo: "393", name: "SAHLUDHEEN P.K", team: "SIYADAH" },
  { code: "A1", program: "Qur'an Talent", section: "SUPER SENIOR", type: "Individual", chestNo: "373", name: "MUHAMMED SUFYAN V", team: "RIFADAH" },
  { code: "A1", program: "Qur'an Talent", section: "SUPER SENIOR", type: "Individual", chestNo: "335", name: "SHIBIL SHAD K", team: "RIFADAH" },
  { code: "A1", program: "Qur'an Talent", section: "SUPER SENIOR", type: "Individual", chestNo: "656", name: "MUHAMMED THULAIB K", team: "SIYADAH" },
  { code: "A1", program: "Qur'an Talent", section: "SUPER SENIOR", type: "Individual", chestNo: "312", name: "MUHAMMED DILSHAD K", team: "QIYADAH" },
  { code: "A1", program: "Qur'an Talent", section: "SUPER SENIOR", type: "Individual", chestNo: "344", name: "ABOOBACKER SIDDIQUE A M", team: "QIYADAH" },

  // A10: Wa'az
  { code: "A10", program: "Wa'az", section: "SUPER SENIOR", type: "Individual", chestNo: "317", name: "MUHAMMED FIYAZ C", team: "WIFADAH" },
  { code: "A10", program: "Wa'az", section: "SUPER SENIOR", type: "Individual", chestNo: "579", name: "MUHAMMED AFSAL. KK", team: "WIFADAH" },
  { code: "A10", program: "Wa'az", section: "SUPER SENIOR", type: "Individual", chestNo: "393", name: "SAHLUDHEEN P.K", team: "SIYADAH" },
  { code: "A10", program: "Wa'az", section: "SUPER SENIOR", type: "Individual", chestNo: "371", name: "MUHAMMED FAHAD K P", team: "SIYADAH" },
  { code: "A10", program: "Wa'az", section: "SUPER SENIOR", type: "Individual", chestNo: "582", name: "MUHAMMED LABEEB O", team: "QIYADAH" },

  // B53: Web Design
  { code: "B53", program: "Web Design", section: "SENIOR", type: "Individual", chestNo: "472", name: "MUHAMMED JASIM", team: "SIYADAH" },
  { code: "B53", program: "Web Design", section: "SENIOR", type: "Individual", chestNo: "396", name: "SAYYID MUHAMMED HANEEFA VT", team: "WIFADAH" },
  { code: "B53", program: "Web Design", section: "SENIOR", type: "Individual", chestNo: "420", name: "MOHAMMED KASIM K", team: "RIFADAH" },
  { code: "B53", program: "Web Design", section: "SENIOR", type: "Individual", chestNo: "501", name: "MUHAMMED ASIM CK", team: "QIYADAH" },

  // D1: Qira'ath
  { code: "D1", program: "Qira'ath", section: "SUB JUNIOR", type: "Individual", chestNo: "623", name: "MUHAMMAD SUHAIL K", team: "RIFADAH" },
  { code: "D1", program: "Qira'ath", section: "SUB JUNIOR", type: "Individual", chestNo: "676", name: "MUHAMMED ASLAH A", team: "RIFADAH" },
  { code: "D1", program: "Qira'ath", section: "SUB JUNIOR", type: "Individual", chestNo: "695", name: "MUHAMMED SHAZIN A", team: "WIFADAH" },
  { code: "D1", program: "Qira'ath", section: "SUB JUNIOR", type: "Individual", chestNo: "683", name: "IBRAHEEM C M", team: "WIFADAH" },
  { code: "D1", program: "Qira'ath", section: "SUB JUNIOR", type: "Individual", chestNo: "664", name: "MUHAMMED RABEEH PT", team: "SIYADAH" },
  { code: "D1", program: "Qira'ath", section: "SUB JUNIOR", type: "Individual", chestNo: "663", name: "MUHAMMED RIYAN T", team: "SIYADAH" },
  { code: "D1", program: "Qira'ath", section: "SUB JUNIOR", type: "Individual", chestNo: "650", name: "DANISH AHMAD K M", team: "QIYADAH" }
];

const DEFAULT_SCHEDULE = [
  { slNo: 1, code: "C31", program: "Essay (ENG)", category: "JUNIOR", venue: "Smart Room", date: "12 Sept 2026", time: "06:30 am", duration: "45 mins" },
  { slNo: 2, code: "C32", program: "Essay (URD)", category: "JUNIOR", venue: "Smart Room", date: "12 Sept 2026", time: "06:30 am", duration: "45 mins" },
  { slNo: 3, code: "D41", program: "Handwriting (MLM)", category: "SUB JUNIOR", venue: "Class 10", date: "12 Sept 2026", time: "06:30 am", duration: "20 mins" },
  { slNo: 48, code: "B53", program: "Web Design", category: "SENIOR", venue: "Computer Lab", date: "14 Sept 2026", time: "02:45 pm", duration: "90 mins" },
  { slNo: 89, code: "D44", program: "MS Paint", category: "SUB JUNIOR", venue: "Computer Lab", date: "16 Sept 2026", time: "06:30 am", duration: "45 mins" }
];

const DEFAULT_SPORTS_CANDIDATES = [
  { team: "SIYADAH", category: "Junior", programName: "Juggling", chestNumber: "585", studentName: "MUHAMMAD MUHSIN" },
  { team: "SIYADAH", category: "Junior", programName: "Juggling", chestNumber: "539", studentName: "FAYAZUDHEEN" },
  { team: "SIYADAH", category: "Junior", programName: "Bottle flip", chestNumber: "539", studentName: "FAYAZUDHEEN" },
  { team: "QIYADAH", category: "Senior", programName: "Foot ball (S)", chestNumber: "446", studentName: "ANSAR K" }
];

const DEFAULT_SPORTS_RESULTS = [
  { programName: "Bottle flip", category: "Junior", firstChest: "612", secondChest: "568", thirdChest: "566", firstPoint: 3, secondPoint: 2, thirdPoint: 1, status: "Published" },
  { programName: "Urtikkoli", category: "Senior", firstChest: "424", secondChest: "515", thirdChest: "530", firstPoint: 3, secondPoint: 2, thirdPoint: 1, status: "Published" },
  { programName: "Free kick", category: "Junior", firstChest: "539", secondChest: "527", thirdChest: "571", firstPoint: 3, secondPoint: 2, thirdPoint: 1, status: "Published" }
];

const DEFAULT_ARTS_RESULTS = [
  { programCode: "A1", programName: "Qur'an Talent", category: "SUPER SENIOR", firstChest: "311", secondChest: "393", thirdChest: "373", firstPoint: 10, secondPoint: 7, thirdPoint: 5, status: "Published" },
  { programCode: "B53", programName: "Web Design", category: "SENIOR", firstChest: "472", secondChest: "501", thirdChest: "420", firstPoint: 10, secondPoint: 7, thirdPoint: 5, status: "Published" },
  { programCode: "D1", programName: "Qira'ath", category: "SUB JUNIOR", firstChest: "663", secondChest: "664", thirdChest: "623", firstPoint: 10, secondPoint: 7, thirdPoint: 5, status: "Published" }
];

class DataEngine {
  constructor() {
    this.initLocalStorage();
    this.syncFromLiveSheet();
  }

  initLocalStorage() {
    if (!localStorage.getItem("ummath_students")) {
      localStorage.setItem("ummath_students", JSON.stringify(DEFAULT_STUDENTS));
    }
    if (!localStorage.getItem("ummath_programs")) {
      localStorage.setItem("ummath_programs", JSON.stringify(DEFAULT_PROGRAM_LIST));
    }
    if (!localStorage.getItem("ummath_schedule")) {
      localStorage.setItem("ummath_schedule", JSON.stringify(DEFAULT_SCHEDULE));
    }
    if (!localStorage.getItem("ummath_sports_candidates")) {
      localStorage.setItem("ummath_sports_candidates", JSON.stringify(DEFAULT_SPORTS_CANDIDATES));
    }
    if (!localStorage.getItem("ummath_sports_results")) {
      localStorage.setItem("ummath_sports_results", JSON.stringify(DEFAULT_SPORTS_RESULTS));
    }
    if (!localStorage.getItem("ummath_arts_results")) {
      localStorage.setItem("ummath_arts_results", JSON.stringify(DEFAULT_ARTS_RESULTS));
    }
    if (!localStorage.getItem("ummath_sheets_api_url")) {
      localStorage.setItem("ummath_sheets_api_url", DEFAULT_LIVE_SHEETS_URL);
    }
  }

  async syncFromLiveSheet() {
    const url = localStorage.getItem("ummath_sheets_api_url") || DEFAULT_LIVE_SHEETS_URL;
    if (!url) return;

    try {
      const resp = await fetch(url);
      if (!resp.ok) return;
      const data = await resp.json();

      // 1. Parse Students Sheet
      if (data.students && Array.isArray(data.students) && data.students.length > 0) {
        const normalizedStudents = data.students.map(s => ({
          chestNo: String(s["Chest No"] || s.chestNo || "").trim(),
          name: String(s["Name"] || s.name || "").trim(),
          class: String(s["Class"] || s.class || "").trim(),
          category: String(s["Category"] || s.category || "").trim(),
          team: String(s["Team"] || s.team || "").trim().toUpperCase(),
          password: String(s["Password"] || s.password || s["Chest No"] || "").trim(),
          driveId: String(s["Link"] || s.driveId || "").trim()
        })).filter(s => s.chestNo);

        if (normalizedStudents.length > 0) {
          localStorage.setItem("ummath_students", JSON.stringify(normalizedStudents));
        }
      }

      // 2. Parse Program List Sheet WITH FORWARD-FILL FOR BLANK CODE/PROGRAM ROWS!
      if (data.programs && Array.isArray(data.programs) && data.programs.length > 0) {
        let currentCode = "";
        let currentProgram = "";
        let currentSection = "";
        let currentType = "";

        const normalizedPrograms = [];
        data.programs.forEach(p => {
          const rawCode = String(p["Code"] || p.code || "").trim();
          const rawProgram = String(p["Program"] || p.program || "").trim();
          const rawSection = String(p["Section"] || p.section || "").trim();
          const rawType = String(p["Type"] || p.type || "").trim();
          const chestNo = String(p["Chest No."] || p["Chest No"] || p.chestNo || "").trim();
          const name = String(p["Name"] || p.name || "").trim();
          const team = String(p["Team"] || p.team || "").trim().toUpperCase();

          // Forward-fill code and program name if blank
          if (rawCode !== "") currentCode = rawCode;
          if (rawProgram !== "") currentProgram = rawProgram;
          if (rawSection !== "") currentSection = rawSection;
          if (rawType !== "") currentType = rawType;

          if (chestNo) {
            normalizedPrograms.push({
              code: currentCode,
              program: currentProgram,
              section: currentSection,
              type: currentType,
              chestNo: chestNo,
              name: name,
              team: team
            });
          }
        });

        if (normalizedPrograms.length > 0) {
          localStorage.setItem("ummath_programs", JSON.stringify(normalizedPrograms));
        }
      }

      // 3. Parse Schedule Sheet
      if (data.schedule && Array.isArray(data.schedule) && data.schedule.length > 0) {
        const normalizedSchedule = data.schedule.map(s => ({
          slNo: s["Sl. No."] || s["SI No"] || s.slNo || 0,
          code: String(s["Program Code"] || s.code || "").trim(),
          program: String(s["Program Name"] || s.program || "").trim(),
          category: String(s["Category"] || s.category || "").trim(),
          venue: String(s["Venue"] || s.venue || "").trim(),
          date: String(s["Date"] || s.date || "").trim(),
          time: String(s["Time"] || s.time || "").trim(),
          duration: String(s["Duration (mins)"] || s["Duration"] || s.duration || "").trim()
        })).filter(s => s.code || s.program);

        if (normalizedSchedule.length > 0) {
          localStorage.setItem("ummath_schedule", JSON.stringify(normalizedSchedule));
        }
      }

      // 4. Parse Sports Candidates
      if (data.sportsCandidates && Array.isArray(data.sportsCandidates) && data.sportsCandidates.length > 0) {
        const normalizedCandidates = data.sportsCandidates.map(c => ({
          team: String(c["Team"] || c.team || "").trim(),
          category: String(c["Category"] || c.category || "").trim(),
          programName: String(c["Program Name"] || c.programName || "").trim(),
          chestNumber: String(c["Chest No"] || c["Chest Number"] || c.chestNumber || "").trim(),
          studentName: String(c["Student Name"] || c.studentName || "").trim()
        }));
        localStorage.setItem("ummath_sports_candidates", JSON.stringify(normalizedCandidates));
      }

      // 5. Parse Sports Results
      if (data.sportsResults && Array.isArray(data.sportsResults) && data.sportsResults.length > 0) {
        const normalizedSportsRes = data.sportsResults.map(r => ({
          programName: String(r["Program Name"] || r.programName || "").trim(),
          category: String(r["Category"] || r.category || "").trim(),
          firstChest: String(r["First Chest No"] || r.firstChest || "").trim(),
          secondChest: String(r["Second Chest No"] || r.secondChest || "").trim(),
          thirdChest: String(r["Third Chest No"] || r.thirdChest || "").trim(),
          firstPoint: Number(r["First Points"] || r.firstPoint || 3),
          secondPoint: Number(r["Second Points"] || r.secondPoint || 2),
          thirdPoint: Number(r["Third Points"] || r.thirdPoint || 1),
          status: String(r["Status"] || r.status || "Published").trim()
        }));
        localStorage.setItem("ummath_sports_results", JSON.stringify(normalizedSportsRes));
      }

      console.log("Successfully synced live data with forward-fill parsing!");
      if (window.appController) {
        window.appController.render();
      }
    } catch (err) {
      console.log("Live Sheets sync notice: Using cached dataset.", err);
    }
  }

  getStudents() {
    return JSON.parse(localStorage.getItem("ummath_students")) || DEFAULT_STUDENTS;
  }

  getStudentByChest(chestNo) {
    const students = this.getStudents();
    return students.find(s => String(s.chestNo).trim() === String(chestNo).trim());
  }

  updateStudentPassword(chestNo, newPassword) {
    const students = this.getStudents();
    const student = students.find(s => String(s.chestNo).trim() === String(chestNo).trim());
    if (student) {
      student.password = newPassword;
      localStorage.setItem("ummath_students", JSON.stringify(students));
      
      const apiUrl = localStorage.getItem("ummath_sheets_api_url") || DEFAULT_LIVE_SHEETS_URL;
      if (apiUrl) {
        fetch(apiUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "updatePassword", chestNo, password: newPassword })
        }).catch(err => console.log("Google Sheets sync deferred", err));
      }
      return true;
    }
    return false;
  }

  getProgramsForStudent(chestNo) {
    const programs = JSON.parse(localStorage.getItem("ummath_programs")) || DEFAULT_PROGRAM_LIST;
    return programs.filter(p => String(p.chestNo).trim() === String(chestNo).trim());
  }

  getSportsForStudent(chestNo) {
    const candidates = JSON.parse(localStorage.getItem("ummath_sports_candidates")) || DEFAULT_SPORTS_CANDIDATES;
    return candidates.filter(c => String(c.chestNumber).trim() === String(chestNo).trim());
  }

  getSchedule() {
    return JSON.parse(localStorage.getItem("ummath_schedule")) || DEFAULT_SCHEDULE;
  }

  // STRICT SCHEDULE CROSS-REFERENCING: Match against student's registered program codes only!
  getScheduleForStudent(chestNo) {
    const studentPrograms = this.getProgramsForStudent(chestNo);
    const masterSchedule = this.getSchedule();
    const studentCodes = studentPrograms.map(p => String(p.code).toUpperCase().trim()).filter(Boolean);
    
    return masterSchedule.filter(s => {
      const schCode = String(s.code).toUpperCase().trim();
      return studentCodes.includes(schCode);
    });
  }

  getSportsResults() {
    return JSON.parse(localStorage.getItem("ummath_sports_results")) || DEFAULT_SPORTS_RESULTS;
  }

  // STRICT STUDENT SPORTS RESULTS FILTER: Show ONLY results where logged-in student won 1st, 2nd, or 3rd!
  getSportsResultsForStudent(chestNo) {
    const allResults = this.getSportsResults();
    const cStr = String(chestNo).trim();

    return allResults.map(r => {
      let position = null;
      let points = 0;
      if (String(r.firstChest).trim() === cStr) { position = "1st Place 🥇"; points = r.firstPoint || 3; }
      else if (String(r.secondChest).trim() === cStr) { position = "2nd Place 🥈"; points = r.secondPoint || 2; }
      else if (String(r.thirdChest).trim() === cStr) { position = "3rd Place 🥉"; points = r.thirdPoint || 1; }

      if (position) {
        return { ...r, studentPosition: position, studentPoints: points };
      }
      return null;
    }).filter(Boolean);
  }

  getArtsResults() {
    return JSON.parse(localStorage.getItem("ummath_arts_results")) || DEFAULT_ARTS_RESULTS;
  }

  calculateSportsPoints(chestNo) {
    let total = 0;
    const cStr = String(chestNo).trim();
    const sportsRes = this.getSportsResults();
    sportsRes.forEach(r => {
      if (String(r.firstChest).trim() === cStr) total += Number(r.firstPoint || 3);
      else if (String(r.secondChest).trim() === cStr) total += Number(r.secondPoint || 2);
      else if (String(r.thirdChest).trim() === cStr) total += Number(r.thirdPoint || 1);
    });
    return total;
  }

  calculateArtsPoints(chestNo) {
    let total = 0;
    const cStr = String(chestNo).trim();
    const artsRes = this.getArtsResults();
    artsRes.forEach(r => {
      if (String(r.firstChest).trim() === cStr) total += Number(r.firstPoint || 10);
      else if (String(r.secondChest).trim() === cStr) total += Number(r.secondPoint || 7);
      else if (String(r.thirdChest).trim() === cStr) total += Number(r.thirdPoint || 5);
    });
    return total;
  }

  calculateStudentPoints(chestNo) {
    return this.calculateSportsPoints(chestNo) + this.calculateArtsPoints(chestNo);
  }

  calculateTeamStandings() {
    const teams = { QIYADAH: 0, SIYADAH: 0, WIFADAH: 0, RIFADAH: 0 };
    const students = this.getStudents();

    students.forEach(s => {
      const pts = this.calculateStudentPoints(s.chestNo);
      if (teams[s.team] !== undefined) {
        teams[s.team] += pts;
      }
    });

    return teams;
  }

  getGoogleDriveImageUrl(driveId) {
    if (!driveId || driveId.trim() === "") return null;
    const cleanId = driveId.trim();
    return `https://lh3.googleusercontent.com/d/${cleanId}`;
  }
}

window.dataEngine = new DataEngine();
