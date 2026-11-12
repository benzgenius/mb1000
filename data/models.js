// 차종·트림·가격 데이터 (세일즈북 2026.10.27 가격표 기준)
const CAT_BASE='https://www.mercedes-benz.co.kr/content/dam/south-korea/passenger-cars/model/catalog/2026/';
const CATS=[['all','전체'],['electric','Electric'],['sedan','세단·해치백'],['coupe','쿠페·카브리올레'],['suv','SUV·오프로더'],['mpv','MPV'],['amg','Mercedes-AMG'],['maybach','Mercedes-Maybach']];
const CATNAME=Object.fromEntries(CATS);
// [id, cat, name, img, catalog file, [[trim, price(만원) or null, '27'?]]]
const M=[
['cla-ev','electric','The all-new electric CLA',4,'The%20all%20new%20electric%20CLA_catalogue_20261021.pdf',[['CLA 200 electric Essential',5290],['CLA 200 electric Advanced',5580],['CLA 200 electric AMG Line',5890],['CLA 250+ electric',6370],['CLA 250+ electric AMG Line',6770]]],
['c-ev','electric','C-Class electric',16,null,[['C 400 4MATIC electric',null,1],['C 400 4MATIC electric AMG Line',null,1]]],
['gla-ev','electric','Electric GLA',20,null,[['GLA 250+ electric',null,1],['GLA 350 4MATIC electric AMG Line',null,1]]],
['eqa','electric','EQA',24,'The%20new%20EQA_Catalogue_20260902.pdf',[['EQA 250',7080],['EQA 250 AMG Line',7670]]],
['eqb','electric','EQB',29,'The%20new%20EQB_Catalogue_20260424.pdf',[['EQB 300 4MATIC',7880],['EQB 300 4MATIC AMG Line',8430]]],
['glb-ev','electric','The all-new electric GLB',34,'The%20all-new%20electric%20GLB_catalogue_20261028.pdf',[['GLB 250+ electric',6990,1]]],
['glc-ev','electric','The all-new electric GLC',36,'The%20all-new%20electric%20GLC_catalogue_20261016.pdf',[['GLC 300 electric 4MATIC AMG Line',9000],['GLC 300 electric 4MATIC AMG Line+',9480]]],
['eqe','electric','EQE',41,'Mercedes-Benz_EQE_Catalogue_20260429.pdf',[['EQE 350+',11000]]],
['eqe-suv','electric','EQE SUV',43,'The%20new%20EQE%20SUV_Catalogue_20260424.pdf',[['EQE 350+ SUV',10600],['EQE 500 4MATIC SUV',14100]]],
['eqs','electric','The new EQS',47,'The%20new%20EQS_Catalogue_20260424.pdf',[['The new EQS',null]]],
['eqs-suv','electric','EQS SUV',49,'Mercedes-Benz_The%20new%20EQS%20SUV_Catalogue_20260907.pdf',[['EQS 450 4MATIC SUV',16600],['EQS 580 4MATIC SUV',19200]]],
['g-eq','electric','G-Class with EQ Technology',53,'G-Class%20with%20EQ%20Technology_Catalogue_20260424.pdf',[['G 580 with EQ Technology',21900],['G 580 with EQ Technology MANUFAKTUR',23850]]],
['a','sedan','A-Class',59,'Mercedes-Benz_A-Class_Catalogue_20260424.pdf',[['The new A-Class',4870]]],
['a-sedan','sedan','A-Class Sedan',61,'Mercedes-Benz_The%20new%20A-Class%20Sedan_Catalogue_20260424.pdf',[['The new A-Class Sedan',5050]]],
['cla','sedan','CLA',63,'The%20all-new%20CLA_catalogue_20261007.pdf',[['CLA 220',5990],['CLA 220 AMG Line',6290]]],
['c','sedan','C-Class',68,'Mercedes-Benz_C-Class_Catalogue_20260424.pdf',[['C 200 AVANTGARDE',6510],['C 200 AMG Line',6830],['C 200 AVANTGARDE',null,1],['C 200 AMG Line',null,1]]],
['e','sedan','E-Class',77,'Mercedes-Benz_The%20new%20E-Class_Catalogue_20260424.pdf',[['E 200 EXCLUSIVE',7750],['E 200 AMG Line',8100],['E 220 d 4MATIC AVANTGARDE',8750],['E 300 4MATIC EXCLUSIVE',9480],['E 300 4MATIC AMG Line',10010],['E 350 e 4MATIC EXCLUSIVE',10110],['E 450 4MATIC AMG Line 한정 사양',11220],['E 450 4MATIC AMG Line',11720],['E 450 4MATIC EXCLUSIVE',12950]]],
['s','sedan','S-Class',98,'Mercedes-Benz_S-Class_Catalogue_20260914.pdf',[['S 350 d 4MATIC',15400],['S 450 4MATIC',16240],['S 450 4MATIC L Exclusive',17540],['S 450 4MATIC L AMG Line',19540],['S 500 4MATIC Long',22000],['S 580 4MATIC Long',27000]]],
['cle-c','coupe','CLE Coupé',112,'The%20all%20new%20CLE%20Coupe%20n%20CLE%20Cabriolet_Catalogue_20260921.pdf',[['CLE 200 Coupé',7760],['CLE 450 4MATIC Coupé',10080]]],
['cle-cab','coupe','CLE Cabriolet',114,'The%20all%20new%20CLE%20Coupe%20n%20CLE%20Cabriolet_Catalogue_20260921.pdf',[['CLE 200 Cabriolet',8410],['CLE 450 4MATIC Cabriolet',10520]]],
['gla','suv','GLA',121,'Mercedes-Benz_GLA_Catalogue_20260707.pdf',[['GLA 250 4MATIC',7080]]],
['glb','suv','GLB',123,'Mercedes-Benz_The%20new%20GLB_Catalogue_20260813.pdf',[['GLB 250 4MATIC',7200]]],
['glc','suv','GLC',125,'The%20new%20GLC%20n%20GLC%20Coupe_Catalogue_20260424.pdf',[['GLC 300 4MATIC',7700],['GLC 220 d 4MATIC',8220],['GLC 300 4MATIC AVANTGARDE',8250],['GLC 300 4MATIC AMG Line',9550]]],
['glc-c','suv','GLC Coupé',134,'The%20new%20GLC%20n%20GLC%20Coupe_Catalogue_20260424.pdf',[['GLC 300 4MATIC Coupé',8000],['GLC 300 4MATIC Coupé AVANTGARDE',8660],['GLC 300 4MATIC Coupé AMG Line',9790]]],
['gle','suv','GLE',141,'The%20new%20GLE_n_GLE_Coupe_Catalogue_20260619.pdf',[['GLE 350 4MATIC',11800],['GLE 300 d 4MATIC',11920],['GLE 450 4MATIC',12900],['GLE 450 4MATIC AMG Line',13900],['GLE 450 4MATIC AMG Line',null,1]]],
['gle-c','suv','GLE Coupé',150,'The%20new%20GLE_n_GLE_Coupe_Catalogue_20260619.pdf',[['GLE 450 d 4MATIC Coupé AMG Line',13400],['GLE 450 4MATIC Coupé AMG Line',14250],['GLE 450 4MATIC Coupé',null,1]]],
['gls','suv','GLS',158,'Mercedes-Benz_The%20new%20GLS_Catalogue_20260702.pdf',[['GLS 450 4MATIC AMG Line',15400],['GLS 450 d 4MATIC AMG Line',15400],['GLS 580 4MATIC AMG Line',19340],['GLS 450 4MATIC',null,1],['GLS 450 4MATIC 6인승',null,1],['GLS 450 4MATIC AMG Line',null,1],['GLS 450 4MATIC AMG Line 6인승',null,1]]],
['g','suv','G-Class',172,'The%20new%20G-Class_Catalogue_20260930.pdf',[['G 450 d',19970],['G 450 d MANUFAKTUR',22820]]],
['v','mpv','V-Class',178,'The%20new%20V-Class_catalogue_20261029.pdf',[['The new V-Class',12400],['V 300 d 4MATIC EXCLUSIVE',12400]]],
['amg-a','amg','Mercedes-AMG A-Class',183,'The%20new%20Mercedes-AMG%20A-Class_Catalogue_20260522.pdf',[['AMG A 45 S 4MATIC+',8140]]],
['amg-as','amg','Mercedes-AMG A-Class Sedan',185,'The%20new%20Mercedes-AMG%20A-Class%20Sedan_Catalogue_20260424.pdf',[['AMG A 35 4MATIC Sedan',6860]]],
['amg-cla','amg','Mercedes-AMG CLA',187,'The%20new%20Mercedes-AMG%20CLA_Catalogue_20260424.pdf',[['Mercedes-AMG CLA',9180]]],
['amg-e','amg','Mercedes-AMG E-Class',189,'Mercedes-AMG%20E-Class_Catalogue_20260519.pdf',[['AMG E 53 Hybrid 4MATIC+',14990]]],
['amg-cle','amg','Mercedes-AMG CLE',191,'The%20all-new%20AMG%20CLE%20Coupe_catalogue_20260921.pdf',[['AMG CLE 53 4MATIC+ Coupé',11060],['AMG CLE 53 4MATIC+ Cabriolet',11660]]],
['amg-gt4','amg','Mercedes-AMG GT 4-Door Coupé',195,'The%20new%20Mercedes-AMG%20GT%204Door_Catalogue_20260424.pdf',[['AMG GT 43 4MATIC+',16400],['AMG GT 55 4MATIC+ 4-Door',null,1],['AMG GT 53 4MATIC+ 4-Door',null,1]]],
['amg-gt','amg','Mercedes-AMG GT Coupé',201,'The%20new%20Mercedes-AMG%20GT%20Coupe_Catalogue_260424.pdf',[['AMG GT 43 Coupé',14950],['AMG GT 55 4MATIC+ Coupé',21000]]],
['amg-sl','amg','Mercedes-AMG SL',205,'Mercedes-AMG_SL_Catalogue_20261105.pdf',[['AMG SL 43',16000],['AMG SL 63 4MATIC+',25000]]],
['amg-glb','amg','Mercedes-AMG GLB',209,'The%20new%20Mercedes-AMG%20GLB_20260716.pdf',[['AMG GLB 35 4MATIC',7950]]],
['amg-glc','amg','Mercedes-AMG GLC',211,'The%20new%20Mercedes-AMG%20GLC%20n%20GLC%20Coupe_Catalogue_20260424.pdf',[['AMG GLC 43 4MATIC',10360],['AMG GLC 43 4MATIC Coupé',10830]]],
['amg-gle','amg','Mercedes-AMG GLE',215,'Mercedes-AMG%20GLE%20n%20GLE%20Coupe_Catalogue_20260619.pdf',[['AMG GLE 53 4MATIC+',16600],['AMG GLE 53 4MATIC+ Coupé',17000],['AMG GLE 53 4MATIC+',null,1],['AMG GLE 53 4MATIC+ Coupé',null,1]]],
['amg-gls','amg','Mercedes-AMG GLS',223,null,[['AMG GLS 63 4MATIC+',21000],['AMG GLS 63 4MATIC+',null,1]]],
['amg-g','amg','Mercedes-AMG G-Class',227,'The%20new%20Mercedes-AMG%20G-Class_Catalogue_20261029',[['AMG G 63',27500],['AMG G 63 MANUFAKTUR',30100]]],
['my-s','maybach','Mercedes-Maybach S-Class',233,'The_new_Mercedes-Maybach_S-Class_Catalogue_20260811.pdf',[['Mercedes-Maybach S 580',31700],['Mercedes-Maybach S 580 MANUFAKTUR',33600],['Mercedes-Maybach S 680',40700]]],
['my-sl','maybach','Mercedes-Maybach SL',240,'The%20all-new%20Mercedes-Maybach%20SL_Catalogue_20260424.pdf',[['Mercedes-Maybach SL 680',34800]]],
['my-gls','maybach','Mercedes-Maybach GLS',242,'The%20new%20Mercedes-Maybach%20GLS_catalogue_20260622.pdf',[['Mercedes-Maybach GLS 600 4MATIC',29500],['Mercedes-Maybach GLS 600 MANUFAKTUR',33700],['Mercedes-Maybach GLS 600 4MATIC',null,1]]],
['my-eqs','maybach','Mercedes-Maybach EQS SUV',249,'The%20all-new%20Mercedes-Maybach%20EQS%20SUV_Catalogue_20260519.pdf',[['Mercedes-Maybach EQS 680 SUV',23500]]]
];
const SOON=[
 ['c-ev','The all-new C-Class electric','27년식 · 국내 출시 예정',16],
 ['gla-ev','The new all-electric GLA','27년식 · 국내 출시 예정',20],
 ['c','The new C-Class','C 200 AVANTGARDE · AMG Line · 27년식',73],
 ['gle','The new GLE · GLE Coupé','GLE 450 4MATIC · 27년식',154],
 ['gls','The new GLS','6인승·7인승 구성 · 27년식',164],
 ['eqs','The new EQS','가격 공개 예정',47],
 ['amg-gt4','Mercedes-AMG GT 4-Door Coupé','GT 53 · GT 55 · 27년식',197],
 ['amg-gle','Mercedes-AMG GLE · GLE Coupé','AMG GLE 53 4MATIC+ · 27년식',217],
 ['my-gls','Mercedes-Maybach GLS','GLS 600 4MATIC · 27년식',242]
];
const NEWS=[
 ['glb-ev','사전 예약','The all-new electric GLB','넉넉한 공간 그대로, 이제는 전기로. 가족의 일상부터 먼 길까지 함께하는 전기 SUV.','GLB 250+ electric · 6,990만원','https://www.mercedes-benz.co.kr/passengercars/campaigns/electric-glb-pre-order.html'],
 ['cla-ev','사전 예약','The all-new electric CLA','감각적인 디자인과 첨단 기술을 담은 새로운 전기 세단.','CLA 200 electric · 5,290만원부터','https://www.mercedes-benz.co.kr/passengercars/campaigns/electric-cla-pre-order.html'],
 ['glc-ev','사전 예약','The all-new electric GLC','첨단 기술과 럭셔리, 일상의 활용성을 모두 갖춘 전기 SUV.','GLC 300 electric 4MATIC · 9,000만원부터','https://www.mercedes-benz.co.kr/passengercars/campaigns/electric-glc-pre-order.html'],
 ['v','사전 예약','The new V-Class','넉넉한 공간과 현대적인 디자인, 모두를 위한 라운지.','The new V-Class · 1억 2,400만원','https://www.mercedes-benz.co.kr/passengercars/campaigns/v-class-pre-order.html']
];

