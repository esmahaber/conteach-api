# conteach-api
<<<<<<< HEAD
NodeJS-conteach API
=======
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /api/kullanicilar | `GET` | Empty | Tüm kullanıcıları listeyin |
| /api/kullanicilar | `POST` | {'ogr_no':' ', 'k_id':'' , 'isim':' ', 'soyisim':'', eposta: '', sifre:'', dogum_tarihi:'', telefon:'', kayit_tarihi:2019-10-11 } | Bir yeni kullanici oluşturun. |
| /api/kullanicilar/:k_id | `GET` | Boş | Kullaniciyi görüntüleyin |
| /api/kullanicilar/:k_id | `PUT` | {'isim':'foo', 'soyisim':'bar'} | Kişiyi yeni bilgilerle güncelleyin. |
| /api/kullanicilar/:k_id | `DELETE` | Boş | Kullaniciyi silin. |
| /api/kullanicilar/no_baslangic/:baslangic_no | `GET` | Empty | Kullaniciyi öğrenci numarasına göre sınırlandırın. |
 
# Randevular
 
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /api/randevular | `GET` | Empty | Tüm randevuları listeleyin. |
| /api/randevular | `POST` | { randevu_id: '', k_id:'', randevu_sahibi:'', randevu_tarihi:'', olusturma_tarihi:'', guncelleme_tarihi:'', kullanici_notu:'' } | Yeni randevu oluştur. |
| /api/randevular/:randevu_id | `GET` | Empty | Randevuyu görüntüleyin. |
| /api/randevular/:randevu_id | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Randevuyu yeni bilgilerle güncelleyin. |
| /api/randevular/:randevu_id | `DELETE` | Empty | Randevuyu silin. |
| /api/randevular/:randevu_id/ilk10randevu | `GET` | Empty | İlk 10 randevuyu görüntüleyin. |
 
# Index
 
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /kayit_ol | `POST` | { username: 'foo', password:'1234' } | Yeni kayit oluştur. |
| /dogrulama | `POST` | { username: 'foo', password:'1234' } | Doğrulama oluşturun. |
>>>>>>> readme file endpoint table
