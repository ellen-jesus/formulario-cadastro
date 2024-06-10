import { CadastroService } from './../../core/services/cadastro.service';
import { FormularioService } from './../../core/services/formulario.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { PessoaUsuaria } from 'src/app/core/types/type';
import { FormValdidations } from 'src/app/shared/form-validations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent  implements OnInit{
  cadastroForm!: FormGroup;

  @Input() acaoClique: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private authService: AutenticacaoService,
    private router: Router  // adicionando a pagina para onde eu quero redirecionar depois de fazer o login
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      confirmarEmail: [null, [Validators.required, FormValdidations.equalTo('email')]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      confirmarSenha: [null, [Validators.required, FormValdidations.equalTo('senha')]]
    });
  }

  emailMatchValidator(group: FormGroup) {
    const email = group.get('email')?.value;
    const confirmarEmail = group.get('confirmarEmail')?.value;
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;

    return email === confirmarEmail && senha === confirmarSenha ? null : { 'mismatch': true };
  }

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro()

    console.log("cadastro realizado com sucesso", formCadastro)
    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as PessoaUsuaria;
      this.authService.cadastrar(novoCadastro).subscribe(
        response => {
          this.router.navigate(['/pagina-desejada']); // substitua '/pagina-desejada' pela rota desejada
        },
        error => {
          console.error('Erro ao cadastrar', error);
        }
      );
      }
    // this.acaoClique.emit();
  }
}

