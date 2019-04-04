var app = new Vue({
  el: "#app",
  data(){
    return {
      dataTugas:[],
      showAlert:false,
      alert:{
        tipo: '',
        message:''
      },
      modal:{
        title:'',
        id: null,
        data:{}
      }
    }
  },
  methods:{
    
    closeAlert(){
      this.showAlert = false
    },
    
    edit(row,id){
      
      this.modal.title = "EDIT DATA";
      this.modal.id = id
      this.modal.data = _.clone(row)
      
      $(this.$refs.modal).modal('show')
      
    },
    
    add(){
      this.modal.title = "TAMBAH TUGAS";
      this.modal.id = null
      this.modal.data = {}
      
      $(this.$refs.modal).modal('show')
    },
    
    hapus(k){
      var result = confirm('Anda ingin menghapus data ini ?');
      if (result) {
        this.$delete(this.dataTugas, k)
        window.localStorage.setItem('dataTugas',JSON.stringify(this.dataTugas) );
      
        this.alert.tipo = 'warning'
        this.alert.message = 'Data Sukses Terhapus'
        this.showAlert = true
      }
    },
    
    save(){
      
      if(this.modal.id || this.modal.id === 0){
        this.dataTugas[this.modal.id] = this.modal.data
      }else{
        this.dataTugas.push(this.modal.data)
      }
      
      window.localStorage.setItem('dataTugas',JSON.stringify(this.dataTugas) );
      
      this.alert.tipo = 'success'
      this.alert.message = 'Edit Data Sukses'
      this.showAlert = true
      
      $(this.$refs.modal).modal('hide')
      
    }
  },
  created(){
    
     if(window.localStorage.getItem('dataTugas') === null){
        window.localStorage.setItem('dataTugas',JSON.stringify([
          {matkul : "Matematika",dosen:"prof.Andika Tata", tugas : "Mengerjakan modul 7.7 di kertas folio bergaris", batas : "2019-05-19"},
          {matkul : "Bahasa Inggris",dosen:"Antoni Putro", tugas : "Membuat Biografi dengan Bahasa Inggris", batas : "2019-07-19"},
          {matkul : "Produktif",dosen:"Toni Sujito", tugas : "Mengerjakan BAB 10 di kertas folio bergaris", batas : "2019-07-19"},
          {matkul : "Bahasa Perancis",dosen:"Drs.Tata Andika", tugas : "Membuat pidato kebangsaan dengan Bahasa Perancis", batas : "2019-07-19"},
          {matkul : "Bahasa Jepang",dosen:"Ahmad Subagjo", tugas : "Membuat vlog berbahasa Jepang", batas : "2019-07-19"},
          ]));
      }  
      
      this.dataTugas = JSON.parse(window.localStorage.getItem('dataTugas'));
    
  }
});