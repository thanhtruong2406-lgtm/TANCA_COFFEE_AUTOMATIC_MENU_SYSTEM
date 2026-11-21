export const CATEGORIES = [
  {
    id: "coffee",
    name: "Cà phê",
    subtitle: "Đậm đà hương vị nguyên bản",
    accentColor: "#6B4F3A",
    panelBg: "#E3CDB8",
  },
  {
    id: "matcha",
    name: "Matcha",
    subtitle: "Tinh hoa trà xanh Nhật Bản",
    accentColor: "#3F6A2E",
    panelBg: "#C5E3B3",
  },
  {
    id: "fruit-tea",
    name: "Trà trái cây",
    subtitle: "Tươi mát từ trái cây nhiệt đới",
    accentColor: "#E06D1A",
    panelBg: "#FFD1AD",
  },
  {
    id: "detox",
    name: "Detox",
    subtitle: "Thanh lọc cơ thể mỗi ngày",
    accentColor: "#6FA687",
    panelBg: "#BCE8D2",
  },
  {
    id: "hot-trend",
    name: "Hot Trend",
    subtitle: "Sự kết hợp mới lạ đầy cuốn hút",
    accentColor: "#D87A96",
    panelBg: "#FAD0DF",
  },
  {
    id: "bakery",
    name: "Bánh",
    subtitle: "Bánh tươi mỗi ngày dùng kèm đồ uống",
    accentColor: "#B87333",
    panelBg: "#F5E1BE",
  },
];

export const DRINK_OPTIONS = {
  sizes: [
    { id: "S", label: "Size S", extraPrice: 0 },
    { id: "M", label: "Size M", extraPrice: 5000 },
    { id: "L", label: "Size L", extraPrice: 10000 },
  ],
  sweetnessLevels: ["0%", "30%", "50%", "70%", "100%"],
  iceLevels: ["Không đá", "Ít đá", "Bình thường", "Nhiều đá"],
  toppings: [
    { id: "white-pearl", name: "Trân châu trắng", price: 5000 },
    { id: "black-pearl", name: "Trân châu hoàng kim", price: 5000 },
    { id: "milk-foam", name: "Kem cheese", price: 10000 },
    { id: "coconut-jelly", name: "Thạch dừa", price: 5000 },
    { id: "egg-pudding", name: "Pudding trứng", price: 8000 },
  ],
  utensils: [
    { id: "with-utensils", label: "Kèm dụng cụ ăn" },
    { id: "no-utensils", label: "Không lấy dụng cụ" },
  ],
  servingTypes: [
    { id: "dine-in", label: "Tại chỗ" },
    { id: "takeaway", label: "Mang về" },
  ],
};

export const DRINKS = [
  // 1. CÀ PHÊ
  {
    id: "coffee-1",
    categoryId: "coffee",
    name: "Cold Brew Truyền Thống",
    price: 45000,
    image: "/images/ST2/CaPhe/coldBrew.png",
    story:
      "Ủ lạnh suốt 16 giờ từ hạt Arabica Cầu Đất, mang hậu vị ngọt dịu và hương thơm trái cây chín.",
    ingredients: "Cà phê Arabica ủ lạnh, đá viên tinh khiết.",
    badge: "Best Seller",
  },
  {
    id: "coffee-2",
    categoryId: "coffee",
    name: "Cà Phê Sữa Đá TANCA",
    price: 39000,
    image: "/images/ST2/CaPhe/CaPheSua.png",
    story:
      "Sự kết hợp hài hòa giữa cà phê phin truyền thống đậm vị và sữa đặc béo thơm.",
    ingredients: "Cà phê Robusta & Arabica, sữa đặc, đá viên.",
    badge: "Signature",
  },
  {
    id: "coffee-3",
    categoryId: "coffee",
    name: "Bạc Xỉu Kem Muối",
    price: 49000,
    image: "/images/ST2/CaPhe/KemMuoi.png",
    story:
      "Vị sữa tươi ngậy béo quyện cùng chút cà phê dịu nhẹ và lớp kem muối mặn mà phía trên.",
    ingredients: "Espresso, sữa tươi thanh trùng, sữa đặc, kem muối biển.",
    badge: "Yêu thích",
  },
  {
    id: "coffee-4",
    categoryId: "coffee",
    name: "Cold Brew Cam Vàng Sả",
    price: 49000,
    image: "/images/ST2/CaPhe/coldBrewCamSa.png",
    story:
      "Vị cà phê ủ lạnh thanh dịu quyện cùng hương tinh dầu vỏ cam vàng và chút sả tươi the mát, mang lại cảm giác sảng khoái tức thì.",
    ingredients:
      "Cold Brew Arabica Cầu Đất, nước cam vàng tươi, syrup đường mía, lát cam sấy, nhánh sả tươi.",
    badge: "Tươi mới",
  },
  {
    id: "coffee-5",
    categoryId: "coffee",
    name: "Caramel Macchiato",
    price: 52000,
    image: "/images/ST2/CaPhe/caramelMacchiato.png",
    story:
      "Lớp bọt sữa mịn màng hòa cùng sốt caramel thơm lừng và vị đắng nhẹ của Espresso rang vừa.",
    ingredients: "Espresso, sữa tươi thanh trùng, sốt Caramel, lớp bọt sữa mịn.",
    badge: "Yêu thích",
  },

  // 2. MATCHA
  {
    id: "matcha-1",
    categoryId: "matcha",
    name: "Matcha Latte",
    price: 49000,
    image: "/images/ST2/Matcha/matchaLatte.png",
    story: "Matcha Nhật Bản hòa quyện với sữa tươi béo mịn.",
    ingredients: "Matcha, sữa tươi, đường, đá.",
    badge: "Signature",
  },
  {
    id: "matcha-2",
    categoryId: "matcha",
    name: "Matcha Kem Cheese",
    price: 55000,
    image: "/images/ST2/Matcha/matchaKemCheese.png",
    story:
      "Vị chát nhẹ thanh tao của bột trà xanh Uji kết hợp lớp kem phô mai mặn béo cuốn hút.",
    ingredients: "Bột Matcha Uji, sữa tươi, lớp kem phô mai, đá.",
    badge: "Best Seller",
  },
  {
    id: "matcha-3",
    categoryId: "matcha",
    name: "Matcha Đậu Đỏ",
    price: 52000,
    image: "/images/ST2/Matcha/matchaDauDo.png",
    story:
      "Matcha sữa tươi mát lạnh ăn kèm hạt đậu đỏ hầm mềm bùi ngọt chuẩn vị Nhật Bản.",
    ingredients: "Matcha Nhật, sữa tươi, đậu đỏ sên đường, đá.",
  },
  {
    id: "matcha-4",
    categoryId: "matcha",
    name: "Matcha Sữa Dừa",
    price: 55000,
    image: "/images/ST2/Matcha/matchaSuaDua.png",
    story:
      "Vị sữa dừa béo thơm thanh ngọt ở tầng dưới kết hợp lớp Matcha Uji xanh mướt, dịu mát chuẩn vị nhiệt đới.",
    ingredients: "Sữa dừa tươi nguyên chất, bột Matcha Uji Nhật Bản, kem sữa béo, đá.",
    badge: "Best Seller",
  },
  {
    id: "matcha-5",
    categoryId: "matcha",
    name: "Matcha Yuzu Thanh Yên",
    price: 52000,
    image: "/images/ST2/Matcha/matchaYuzu.png",
    story:
      "Sự giao thoa độc đáo giữa vị trà xanh chát dịu và hương quýt Yuzu Nhật Bản chua thanh đầy tỉnh táo.",
    ingredients: "Bột Matcha Nhật, mứt quýt Yuzu, nước tinh khiết, mật ong hoa rừng, đá viên.",
    badge: "Mới",
  },

  // 3. TRÀ TRÁI CÂY
  {
    id: "fruit-1",
    categoryId: "fruit-tea",
    name: "Trà Đào Cam Sả",
    price: 45000,
    image: "/images/ST2/TraTraiCay/traDaoCamSa.png",
    story:
      "Hương sả thoang thoảng quyện cùng vị cam vàng tươi mát và miếng đào giòn ngọt.",
    ingredients: "Lục trà lài, đào ngâm, cam vàng tươi, sả cây, đường mía.",
    badge: "Best Seller",
  },
  {
    id: "fruit-2",
    categoryId: "fruit-tea",
    name: "Trà Nhiệt Đới Bốn Mùa",
    price: 49000,
    image: "/images/ST2/TraTraiCay/TraBonMua.png",
    story:
      "Sự bùng nổ vitamin từ các loại trái cây tươi nhiệt đới trên nền trà ô long thanh khiết.",
    ingredients: "Trà Ô long, cam, đào, chanh dây, táo, đá.",
    badge: "Tươi mát",
  },
  {
    id: "fruit-3",
    categoryId: "fruit-tea",
    name: "Trà Vải Hoa Hồng",
    price: 45000,
    image: "/images/ST2/TraTraiCay/TraVai.png",
    story:
      "Ngọt thanh hương vải thiều kết hợp hương hoa hồng dịu nhẹ đầy thư giãn.",
    ingredients: "Hồng trà, trái vải ngâm, syrup hoa hồng, lá bạc hà.",
  },
  {
    id: "fruit-4",
    categoryId: "fruit-tea",
    name: "Trà Ô Long Mãng Cầu",
    price: 49000,
    image: "/images/ST2/TraTraiCay/traMangCau.png",
    story:
      "Từng múi mãng cầu xiêm chua ngọt tự nhiên kết hợp nền trà Ô Long nướng thơm dịu, giải nhiệt cực đã.",
    ingredients: "Trà Ô Long cao sơn, thịt mãng cầu xiêm tươi, tắc tươi, đường phèn.",
    badge: "Hot",
  },
  {
    id: "fruit-5",
    categoryId: "fruit-tea",
    name: "Trà Xoài Chanh Dây",
    price: 45000,
    image: "/images/ST2/TraTraiCay/traXoaiChanhDay.png",
    story:
      "Sắc vàng rực rỡ cùng hương thơm nồng nàn của xoài chín và chanh dây tươi mát.",
    ingredients: "Lục trà lài, mứt xoài tươi, cốt chanh dây, thạch dừa giòn, lá bạc hà.",
    badge: "Tươi mát",
  },

  // 4. DETOX
  {
    id: "detox-1",
    categoryId: "detox",
    name: "Detox Chanh Vàng Bạc Hà",
    price: 42000,
    image: "/images/ST2/Detox/DetoxChanhBacHa.png",
    story:
      "Thanh lọc cơ thể và đánh thức giác quan với vị chua dịu của chanh vàng cùng lá bạc hà the mát.",
    ingredients: "Chanh vàng Mỹ, lá bạc hà tươi, mật ong rừng, nước tinh khiết.",
    badge: "Healthy",
  },
  {
    id: "detox-2",
    categoryId: "detox",
    name: "Detox Cam Quế Mật Ong",
    price: 45000,
    image: "/images/ST2/Detox/detoxCamQue.png",
    story:
      "Sự kết hợp ấm áp và giàu chất chống oxy hóa từ cam tươi, thanh quế và mật ong nguyên chất.",
    ingredients: "Cam vàng, quế thanh, mật ong, hạt chia.",
  },
  {
    id: "detox-3",
    categoryId: "detox",
    name: "Detox Táo Xanh Cần Tây",
    price: 48000,
    image: "/images/ST2/Detox/DetoxTaoXanh.png",
    story:
      "Bổ sung năng lượng xanh tươi, giữ dáng và làm đẹp da tự nhiên mỗi ngày.",
    ingredients: "Táo xanh, cần tây tươi, dứa, chanh vàng.",
  },
  {
    id: "detox-4",
    categoryId: "detox",
    name: "Detox Dâu Dưa Leo Hương Thảo",
    price: 45000,
    image: "/images/ST2/Detox/detoxDauDuaLeo.png",
    story:
      "Hương thơm thảo mộc của nhánh hương thảo tươi hòa cùng vị ngọt mọng của dâu tây và dưa leo mát lành.",
    ingredients:
      "Dâu tây tươi cắt lát, dưa leo baby, lá hương thảo (rosemary), nước tinh khiết, mật ong.",
    badge: "Đẹp da",
  },
  {
    id: "detox-5",
    categoryId: "detox",
    name: "Detox Bưởi Hồng Nha Đam",
    price: 48000,
    image: "/images/ST2/Detox/detoxBuoiHong.png",
    story:
      "Vị bưởi hồng the mát giàu Vitamin C kết hợp những viên nha đam giòn mát giúp thanh lọc và cấp ẩm cho cơ thể.",
    ingredients: "Múi bưởi hồng tươi, nha đam đường phèn, chanh vàng, lá bạc hà.",
    badge: "Giữ dáng",
  },

  // 5. HOT TREND
  {
    id: "trend-1",
    categoryId: "hot-trend",
    name: "Matcha Dâu Tây Kem Sữa",
    price: 55000,
    image: "/images/ST2/HotTrend/MatchaDauKem.png",
    story:
      "Tầng dâu tây nghiền chua ngọt quyện cùng sữa tươi và lớp Matcha xanh mướt bắt mắt.",
    ingredients: "Mứt dâu tây tươi, sữa tươi thanh trùng, bột Matcha Nhật, kem sữa.",
    badge: "Hot Trend",
  },
  {
    id: "trend-2",
    categoryId: "hot-trend",
    name: "Sữa Tươi Dâu Tây Nghiền",
    price: 52000,
    image: "/images/ST2/HotTrend/suaDauTayNghien.png",
    story:
      "Vị dâu Đà Lạt tươi mọng hòa quyện cùng sữa tươi béo ngậy chuẩn phong cách Hàn Quốc.",
    ingredients: "Dâu tây tươi nghiền, sữa tươi, kem tươi, lá bạc hà.",
    badge: "Mới",
  },
  {
    id: "trend-3",
    categoryId: "hot-trend",
    name: "Trà Sữa Hoa Anh Đào",
    price: 55000,
    image: "/images/ST2/HotTrend/traSuaHoaAnhDao.png",
    story:
      "Lấy cảm hứng từ mùa hoa anh đào Nhật Bản với sắc hồng dịu dàng và hương thơm thanh tao.",
    ingredients: "Trà Ô long trắng, sữa tươi, sốt hoa anh đào, trân châu trắng.",
  },
  {
    id: "trend-4",
    categoryId: "hot-trend",
    name: "Trà Sữa Ô Long Kem Trứng Khè",
    price: 55000,
    image: "/images/ST2/HotTrend/traSuaKemTrungKhe.png",
    story:
      "Nền trà Ô Long đậm vị trà được phủ lớp kem trứng brulee khè lửa thơm ngậy mùi caramel cháy cạnh.",
    ingredients: "Trà Ô Long rang đậm, sữa tươi, lớp kem trứng khè đường nâu, trân châu hoàng kim.",
    badge: "Best Seller",
  },
  {
    id: "trend-5",
    categoryId: "hot-trend",
    name: "Sữa Tươi Khoai Môn Nghiền",
    price: 52000,
    image: "/images/ST2/HotTrend/suaTuoiKhoaiMon.png",
    story:
      "Lớp khoai môn tươi nghiền mịn dẻo bùi quết quanh thành ly quyện cùng sữa tươi mát lạnh sắc tím pastel cuốn hút.",
    ingredients: "Khoai môn tươi sên sữa, sữa tươi thanh trùng, trân châu trắng giòn.",
    badge: "Hot Trend",
  },

  // 6. BÁNH
  {
    id: "bakery-1",
    categoryId: "bakery",
    name: "Bánh Choco Mint",
    price: 45000,
    image: "/images/ST2/Banh/banhChocoMint.png",
    story:
      "Cốt bánh cacao đậm vị hòa cùng lớp kem mousse bạc hà the mát, phủ vụn socola đen giòn nhẹ.",
    ingredients: "Bột cacao, kem tươi whipping, tinh chất bạc hà tự nhiên, socola đen.",
    servingTemp: "Dùng lạnh",
    badge: "Best Seller",
  },
  {
    id: "bakery-2",
    categoryId: "bakery",
    name: "Bánh Mousse Chanh Dây",
    price: 45000,
    image: "/images/ST2/Banh/banhMousseChanhDay.png",
    story:
      "Lớp mousse mềm tan chua ngọt thanh dịu, phủ sốt chanh dây tươi vàng óng bắt mắt.",
    ingredients: "Chanh dây tươi, kem phô mai, kem tươi, cốt bánh bông lan vani.",
    servingTemp: "Dùng lạnh",
    badge: "Yêu thích",
  },
  {
    id: "bakery-3",
    categoryId: "bakery",
    name: "Bánh Tiramisu Cà Phê",
    price: 49000,
    image: "/images/ST2/Banh/banhTiramisu.png",
    story:
      "Bánh ladyfinger thấm đẫm Espresso TANCA xen kẽ lớp kem mascarpone béo mịn và bột cacao nguyên chất.",
    ingredients: "Phô mai mascarpone, Espresso TANCA, bánh quy sampa, bột cacao.",
    servingTemp: "Dùng lạnh",
    badge: "Signature",
  },
  {
    id: "bakery-4",
    categoryId: "bakery",
    name: "Bánh Mousse Matcha Uji",
    price: 48000,
    image: "/images/ST2/Banh/banhMousseMatcha.png",
    story:
      "Vị trà xanh Uji chát nhẹ thanh tao quyện cùng mousse sữa tươi mịn màng chuẩn phong vị Kyoto.",
    ingredients: "Bột Matcha Uji Nhật, kem tươi, cốt bông lan trà xanh.",
    servingTemp: "Dùng lạnh",
    badge: "Signature",
  },
  {
    id: "bakery-5",
    categoryId: "bakery",
    name: "Bánh Croissant Trứng Muối",
    price: 42000,
    image: "/images/ST2/Banh/banhCroissantTrungMuoi.png",
    story:
      "Vỏ bánh sừng bò ngàn lớp nướng giòn rụm, bên trong ngập sốt trứng muối kim sa béo mặn tan chảy.",
    ingredients: "Bột mì Pháp, bơ lạt, sốt trứng muối kim sa.",
    servingTemp: "Dùng nóng",
    badge: "Hot",
  },
  {
    id: "bakery-6",
    categoryId: "bakery",
    name: "Bánh Mì Que",
    price: 29000,
    image: "/images/ST2/Banh/banhMiQuePateBo.png",
    slideImages: [
      "/images/ST2/Banh/banhMiQuePateBo.png",
      "/images/ST2/Banh/banhMiQueGaCayPhoMai.png",
    ],
    fillings: [
      {
        id: "pate-bo",
        label: "Nhân pate bò",
        image: "/images/ST2/Banh/banhMiQuePateBo.png",
      },
      {
        id: "ga-cay",
        label: "Nhân gà cay phô mai",
        image: "/images/ST2/Banh/banhMiQueGaCayPhoMai.png",
      },
    ],
    story:
      "Vỏ bánh mì que nướng giòn rụm thơm bơ, tùy chọn nhân pate bò đậm đà hoặc nhân gà cay phô mai béo ngậy tan chảy.",
    ingredients: "Bánh mì que nướng giòn, bơ lạt, pate bò hoặc ức gà xé sốt cay phô mai.",
    servingTemp: "Dùng nóng",
    badge: "Mới",
  },
];
