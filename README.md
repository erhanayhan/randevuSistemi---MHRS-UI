# randevuSistemi---MHRS-UI
REACT.JS-FRONTEND

# PROJE HAKKINDA
MHRS Randevu Sistemi ana sayfa olarak randevu al sayfası karşımıza gelir yönetilebilmesi kolay olması açısından management tarafıda aynı menüde gözükmektedir.
Management tarafında HASTANE,DOKTOR,ONLİNEDOKTOR,VE RANDEVULAR Sekmeleri bulunmaktadır.İlgili sayfalarda CRUD işlemleri yapılmıştır.Projede şuanlık login bulunmamaktadır ancak halen geliştirilme aşamasında olduğundan üzerine koyularak devam edilecektir.Projemde PrimeReact kullandım ve onun eklentilerini.Bootstrap kullandım çeşitlilik çok olsun diye.
Ve daha birsürü eklenti burda var burayı fazla uzun tutmak istemem resimler üzerinden projemi anlatmak istiyorum.

# ANASAYFA
## Randevu Al 
![image](https://user-images.githubusercontent.com/65370170/132061855-c136ec2d-8b5d-43ea-bc2e-4cdf8527118a.png)

Burada il ilçe mahalle departman ve doktor kullanıcıdan isteniyor burada tüm filtrelemeler yapılmıştır ile göre ilçeler ilçeye göre mahalleler vs..
randevutarihi kısmında tarih seçildiği anda karşımıza şöyle bir ekran gelir;

![image](https://user-images.githubusercontent.com/65370170/132062392-41605789-d20e-4194-b371-04e9cdd78668.png)

Randevu Alın Butonuna tıklandıktan sonra ise ;

![image](https://user-images.githubusercontent.com/65370170/132062514-faa4a1d4-a8f3-475c-9d86-3209d6ee1b2a.png)

İsim TC TEL VE MAİL ALANI GELİR BU alanda isim tc ve telefon zorunlu alan olup burada VALİDATİON işlemleri yapılmıştır.

![image](https://user-images.githubusercontent.com/65370170/132062705-d167488e-4cc8-462b-8294-1de84527def0.png)

Bilgiler girildikten sonra ise randevu başarılı bir şekilde kaydedilir ve bir pencere açılır;

![image](https://user-images.githubusercontent.com/65370170/132062839-7dcc1daa-76da-4ce6-9a0c-37a8fc4d4df7.png)

Burada veriler veritabanına kaydedilir ve alınan randevular bir daha listelenmez!!

# MANAGEMENT(YÖNETİM)
## HOSPİTAL(HASTANE)

Burası CRUD İşlemlerinin gerçekleştiği sayfadır.

![image](https://user-images.githubusercontent.com/65370170/132063168-c1338f73-b263-4273-8a53-304cb4797593.png)

Yeni bir hastane eklemek istediğimizde new butonu ile karşımıza;

![image](https://user-images.githubusercontent.com/65370170/132063232-eac9384d-4c2d-462c-bd42-89c45046ab75.png)

bu ekran gelir ve eklemek istediğimiz hastanenin adres bilgisini ve ismini yazmamız yeterli.

Update  ve delete işlemleri de aynı şekilde çalışmaktadır.


## DOCTOR

Burada da aynı şekilde CRUD İşlemleri yapılır.

![image](https://user-images.githubusercontent.com/65370170/132063441-00b3e8cb-c50c-41be-b2c4-a650902c05d4.png)

Yeni bir doktor eklediğimiz zaman ise NEW butonu ile yine karşımıza ;

![image](https://user-images.githubusercontent.com/65370170/132063550-223de82b-6ba3-4460-8b97-8f66546200ba.png)

bu ekran gelir ve doktor ekleme işleminide başarılı bir şekilde yaparız.

## ONLİNEDOCTOR(BOŞ RANDEVU SAATLERİ AYARLAMA EKRANI)

Burada da aynı şekilde CRUD İşlemleri yapılır.

![image](https://user-images.githubusercontent.com/65370170/132063691-a556a800-8299-408d-a611-7215b9b2ceda.png)

Yeni bir saat eklediğimiz zaman ise NEW butonu ile yine karşımıza ;

![image](https://user-images.githubusercontent.com/65370170/132063782-ce75c12d-82c1-4d9f-8cac-c1f52965c56e.png)

bu ekran gelir ve saat ekleme işleminide başarılı bir şekilde yaparız.

## APPOİNTMENTS(ALINAN RANDEVULAR)

Burada sadece listeleme İşlemleri yapılır.İstenirse Diğer işlemlerde eklenebilir tabi.

![image](https://user-images.githubusercontent.com/65370170/132064036-d83971ca-7057-4534-8b2e-ae28d82070d2.png)


# EXPORT İŞLEMİ İLE VERİLERİ DIŞA AKTARABİLİYORUZ.
























