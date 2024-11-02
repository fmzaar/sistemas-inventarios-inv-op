import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class PredictionConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 3})  // Periodos a predecir por corrida
    periodsToPredict: number;

    @Column({nullable: true})
    DataStartDate: Date;

    @Column({nullable: true})
    DataEndDate: Date;


    @Column({default: 'MEP'})  // Método de cálculo del error
    errorCalculationMethod: string;

    @Column('decimal', {precision: 6, scale: 2})  // Error aceptable
    acceptableError: number;

    @Column()
    predictionInterval: string;

    @CreateDateColumn()
    createdAt: Date;

}
