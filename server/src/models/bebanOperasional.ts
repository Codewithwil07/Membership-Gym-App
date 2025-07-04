export interface BebanOperasionalDTO {
    nama: string;
    jumlah: number;
    tanggal?: Date;
    keterangan?: string;
}

export interface BebanOperasionalResponse extends BebanOperasionalDTO {
    id: number;
    created_at: Date;
}
